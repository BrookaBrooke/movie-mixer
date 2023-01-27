from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List
from fastapi import HTTPException


class MovieOut(BaseModel):
    id: int
    title: str
    released: date | None
    plot: str
    imdbID: str | None
    poster: str | None
    vote_avr: float
    api3_id: int


class MovieIn(BaseModel):
    title: str
    released: date | None
    plot: str
    imdbID: str | None
    poster: str | None
    vote_avr: float
    api3_id: int


class MovieRepository:
    def create(self, movie: MovieIn) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO movies (
                        title
                        , release_date
                        , overview
                        , imdb_id
                        , poster_path
                        , vote_average
                        , api3_id
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        movie.title,
                        movie.released,
                        movie.plot,
                        movie.imdbID,
                        movie.poster,
                        movie.vote_avr,
                        movie.api3_id,
                    ],
                )
                id = db.fetchone()[0]
                data = movie.dict()
                return MovieOut(id=id, **data)

    def get(self) -> List[MovieOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM movies;
                    """,
                )
                result = []
                for record in db:
                    movie = MovieOut(
                        id=record[0],
                        title=record[1],
                        released=record[2],
                        plot=record[3],
                        imdbID=record[4],
                        poster=record[5],
                        vote_avr=record[6],
                        api3_id=record[7],
                    )
                    result.append(movie)
                return result

    def list_by_ids(self, ids: str) -> List[MovieOut]:
        id_list = list(map(lambda x: int(x), ids.split(",")))
        if id_list is None:
            return []
        stmt = """
        SELECT * FROM movies
        WHERE id IN (%s)
        """ % ",".join(
            "%s" for _ in id_list
        )
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    stmt,
                    id_list,
                )
                return [
                    MovieOut(
                        id=record[0],
                        title=record[1],
                        released=record[2],
                        plot=record[3],
                        imdbID=record[4],
                        poster=record[5],
                        vote_avr=record[6],
                        api3_id=record[7],
                    )
                    for record in db
                ]

    def get_by_imdb_id(self, imdb_id: str) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM movies
                    WHERE imdb_id = %s;
                    """,
                    [imdb_id],
                )
                movie = db.fetchone()

                if movie is None:
                    raise HTTPException(
                        status_code=404, detail="Movie not found"
                    )

                return MovieOut(
                    id=movie[0],
                    title=movie[1],
                    released=movie[2],
                    plot=movie[3],
                    imdbID=movie[4],
                    poster=movie[5],
                    vote_avr=movie[6],
                    api3_id=movie[7],
                )

    def get_by_id(self, id: int) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM movies
                    WHERE id = %s;
                    """,
                    [id],
                )
                movie = db.fetchone()

                if movie is None:
                    raise HTTPException(
                        status_code=404, detail="Movie not found"
                    )

                return MovieOut(
                    id=id,
                    title=movie[1],
                    released=movie[2],
                    plot=movie[3],
                    imdbID=movie[4],
                    poster=movie[5],
                    vote_avr=movie[6],
                    api3_id=movie[7],
                )
