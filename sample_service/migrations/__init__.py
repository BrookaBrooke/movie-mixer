import hashlib
from importlib import import_module
from itertools import zip_longest
import os.path
from pathlib import Path
from queries.pool import pool

from psycopg import AsyncConnection
from psycopg.rows import class_row
from pydantic import BaseModel

LATEST = {}
ZERO = {}


class MigrationRecord(BaseModel):
    name: str
    digest: bytes

    def __eq__(self, other):
        return (
            other
            and isinstance(other, MigrationRecord)
            and self.name == other.name
            and self.digest == other.digest
        )

    def __str__(self):
        digest = self.digest.hex()
        return f"<MigrationRecord {self.name}\n{digest}\n>"


class MigrationStep(BaseModel):
    up: str
    down: str | None


class MigrationFile(MigrationRecord):
    steps: list[MigrationStep]


async def read_migrations(dir: str) -> list[MigrationFile]:
    migrations = []
    files = sorted(
        [
            file
            for file in Path(dir).iterdir()
            if not str(file.name).startswith("__")
        ]
    )
    hash = hashlib.sha256()
    for file in files:
        if file.suffix == ".py":
            m = import_module(f".{str(file.stem)}", package=__package__)
            hash.update(bytes(str(m.steps), encoding="utf8"))
            migrations.append(
                MigrationFile(
                    name=str(file.stem),
                    digest=hash.digest(),
                    steps=[MigrationStep(up=s[0], down=s[1]) for s in m.steps],
                )
            )
    return migrations


async def ensure_migrations_table(db_url: str):
    async with await AsyncConnection.connect(db_url) as conn:
        async with conn.cursor() as db:
            await db.execute(
                """
                CREATE TABLE IF NOT EXISTS migrations (
                    name VARCHAR(300) PRIMARY KEY NOT NULL,
                    digest BYTEA NOT NULL
                );
                """
            )


async def current_migrations(db_url: str) -> list[MigrationRecord]:
    async with await AsyncConnection.connect(db_url) as conn:
        async with conn.cursor(row_factory=class_row(MigrationRecord)) as db:
            await db.execute(
                """
                SELECT name, digest
                FROM migrations
                ORDER BY name;
                """
            )
            return await db.fetchall()


async def up(db_url, to=LATEST, dir=os.path.dirname(__file__)):
    await ensure_migrations_table(db_url)
    migrations = await read_migrations(dir)
    applied = await current_migrations(db_url)
    migrations_to_run = zip_longest(migrations, applied)
    if to != ZERO:
        migrations_to_run = migrations_to_run[:to]
    for migration, record in migrations_to_run:
        if record and migration != record:
            message = f"Incompatible migration history at {migration.name}"
            raise RuntimeError(message)
        elif record and migration == record:
            continue
        async with await AsyncConnection.connect(db_url) as conn:
            async with conn.cursor() as db:
                for step in migration.steps:
                    await db.execute(step.up)
                await db.execute(
                    """
                    INSERT INTO migrations (name, digest)
                    VALUES (%s, %s)
                    """,
                    [migration.name, migration.digest],
                )


async def down(db_url, to=ZERO, dir=os.path.dirname(__file__)):
    await ensure_migrations_table(db_url)
    migrations = await read_migrations(dir)
    applied = await current_migrations(db_url)
    migrations_to_run = list(reversed(list(zip(migrations, applied))))
    if to != ZERO:
        migrations_to_run = migrations_to_run[:to]
    for migration, record in migrations_to_run:
        if migration != record:
            message = f"Incompatible migration history at {migration.name}"
            raise RuntimeError(message)
        async with await AsyncConnection.connect(db_url) as conn:
            async with conn.cursor() as db:
                for step in reversed(migration.steps):
                    await db.execute(step.down)
                await db.execute(
                    """
                    DELETE FROM migrations
                    WHERE name = %s;
                    """,
                    [migration.name],
                )

def populate():
    print("Populating database...")
    with pool.connection() as conn:
        with conn.cursor() as db:
            result = db.execute(
            """
            INSERT INTO accounts (username, email, first_name, last_name, hashed_password)
            VALUES ('one','one@me.com','one','string','$2b$12$A9/YMVRgPb7G5BvASfVpOetKAAk/YoS/Kk9gXXqdAPEF2avKLy6d2');

            INSERT INTO movie_groups (name, owner)
            VALUES ('Favorites 1',1);

            INSERT INTO movies (title, released, plot, rated,
                    imdbID, poster)
            VALUES ('Starwars 1', '2013-01-01', 'Short', 'PG',
                    001, 'imgurl_001'),
                    ('Starwars 2', '2013-01-01', 'Medium', 'PG',
                    002, 'imgurl_002'),
                    ('Starwars 3', '2013-01-01', 'Long', 'PG',
                    003, 'imgurl_003');

            INSERT INTO movie_items (movie_id, movie_group_id,item_position)
            VALUES (1,1,1),
                    (2,1,2);

            """
            )
            print("Database populated")