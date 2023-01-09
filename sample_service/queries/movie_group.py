from pydantic import BaseModel
from typing import Dict, Any
from queries.pool import pool
from typing import List


class MovieGroup(BaseModel):
    id: int
    name: str
    owner: int


class MovieGroupIn(BaseModel):
    name: str
    owner: int


class MovieGroupOut(BaseModel):
    id: int
    name: str
    owner: int


class MovieGroupRepository:
    def list(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT * FROM movie_groups")
                return db.fetchall()

    def get(self, id: int) -> MovieGroupOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT * FROM movie_groups WHERE id = %s", [id])
                print("DB : ", db)
                data = db.fetchone()
                print(data)
                return MovieGroupOut(
                    id=data[0],
                    name=data[1],
                    owner=data[2],
                )

    def create(self, movie_group: MovieGroupIn) -> MovieGroupOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "INSERT INTO movie_groups (name, owner) VALUES (%s, %s) RETURNING id",
                    (movie_group.name, movie_group.owner),
                )
                print(movie_group)
                data = movie_group.dict()
                print(data)
                id = db.fetchone()[0]
                print("ID: ", id)
                return MovieGroupOut(id=id, **data)

    def update(self, id: int, movie_group: MovieGroupIn) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "UPDATE movie_groups SET name = %s, owner = %s WHERE id = %s",
                    (movie_group.name, movie_group.owner, id),
                )
                return movie_group

    def delete(self, id: int) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("DELETE FROM movie_groups WHERE id = %s", (id,))
                return {"id": id}
