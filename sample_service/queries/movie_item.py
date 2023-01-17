from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List, Dict, Any


class MovieItemOut(BaseModel):
    id: int
    movie_id: int
    movie_group_id: int
    item_position: int


class MovieItemIn(BaseModel):
    movie_id: int
    movie_group_id: int
    item_position: int


class MovieGroupItem(BaseModel):
    id: int
    item_position: int
    movie_id: int
    title: str


class ItemPosition(BaseModel):
    id: int
    item_position: int

class Error(BaseModel):
    message: str


class MovieItemRepository:
    def create(self, movieitem: MovieItemIn) -> MovieItemOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movie_items (movie_id, movie_group_id, item_position)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        movieitem.movie_id,
                        movieitem.movie_group_id,
                        movieitem.item_position,
                    ],
                )
                id = result.fetchone()[0]
                data = movieitem.dict()
                print(result.fetchone())
                return MovieItemOut(id=id, **data)

    def get(self) -> List[MovieItemOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, movie_id, movie_group_id, item_position
                    FROM movie_items;
                    """,
                )
                result = []
                for record in db:
                    movieitem = MovieItemOut(
                        id=record[0],
                        movie_id=record[1],
                        movie_group_id=record[2],
                        item_position=record[3],
                    )
                    result.append(movieitem)
                return result
            
    def get_detail(self,item_id: int) -> MovieItemOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT * 
                    FROM movie_items
                    WHERE id = %s;
                    """,[item_id]
                )
                record = db.fetchone()
                print(record)
                return MovieItemOut(
                        id=record[0],
                        movie_id=record[1],
                        movie_group_id=record[2],
                        item_position=record[3]
                        )

    def get_list(self, movie_group_id) -> List[MovieGroupItem]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT movie_items.id, movie_items.item_position, movie_items.movie_id, movies.title
                    FROM movie_items
                    INNER JOIN movies ON movies.id = movie_items.movie_id
                    WHERE movie_items.movie_group_id = %s
                    ORDER BY item_position
                    """,
                    [movie_group_id],
                )
                result = []
                for record in db:
                    movieitem = MovieGroupItem(
                        id=record[0],
                        item_position=record[1],
                        movie_id=record[2],
                        title=record[3],
                    )
                    result.append(movieitem)
                return result

    def update(self, items: List[ItemPosition]) -> List[ItemPosition]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                for movie_item in items:
                    db.execute(
                        "UPDATE movie_items SET item_position = %s WHERE id = %s",
                        (movie_item.item_position, movie_item.id),
                    )
                return items

    def delete(self, id: int) -> Dict[str, Any]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("DELETE FROM movie_items WHERE id = %s", (id,))
                return {"id": id}
