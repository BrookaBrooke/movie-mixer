from pydantic import BaseModel
from typing import Dict, Any
from queries.pool import pool


class MovieGroupRepository:
    def get(self, id: int) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT * FROM movie_groups WHERE id = %s", (id,))
                return dict(db.fetchone())

    def create(self, movie_group: Dict[str, Any]) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "INSERT INTO movie_groups (name, owner) VALUES (%s, %s) RETURNING id",
                    (movie_group["name"], movie_group["owner"]),
                )
                movie_group["id"] = db.fetchone()[0]
                return movie_group

    def update(self, id: int, movie_group: Dict[str, Any]) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "UPDATE movie_groups SET name = %s, owner = %s WHERE id = %s",
                    (movie_group["name"], movie_group["owner"], id),
                )
                return movie_group

    def delete(self, id: int) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("DELETE FROM movie_groups WHERE id = %s", (id,))
                return {"id": id}
