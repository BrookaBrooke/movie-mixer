from pydantic import BaseModel
from typing import Dict, Any
from queries.pool import pool


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
                return [
                    MovieGroupOut(
                        id=record[0], name=record[1], owner=record[2]
                    )
                    for record in db
                ]

    def get(self, id: int) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT * FROM movie_groups WHERE id = %s", (id,))
                return db.fetchone()

    def create(self, movie_group: MovieGroupIn) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    "INSERT INTO movie_groups (name, owner) VALUES (%s, %s) RETURNING id",
                    (movie_group.name, movie_group.owner),
                )
                movie_group_dict = movie_group.dict()
                movie_group_dict["id"] = db.fetchone()[0]
                return movie_group_dict

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
