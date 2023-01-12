from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List
from fastapi import HTTPException


class MovieOut(BaseModel):
    id: int
    title: str
    release_date: date
    overview: str
    imdb_id: str
    poster_path: str
    vote_average: str


class MovieIn(BaseModel):
    title: str
    release_date: date
    overview: str
    imdb_id: str
    poster_path: str
    vote_average: str


class MovieRepository:
    def create(self, movie: MovieIn) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movies (title, release_date, overview, imdb_id, poster_path, vote_average)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        movie.title,
                        movie.release_date,
                        movie.overview,
                        movie.imdb_id,
                        movie.poster_path,
                        movie.vote_average,
                    ],
                )
                id = result.fetchone()[0]
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
                        release_date=record[2],
                        overview=record[3],
                        imdb_id=record[4],
                        poster_path=record[5],
                        vote_average=record[6],
                    )
                    result.append(movie)
                return result

                # print("*************")
                # print(all_movies)
                # print("*************")
                # print(result.fetchall())")
                # return all_movies

                # if all_movies is None:
                #     return None
                # else:
                #     for i in all_movies:
                #         list_movies.append(i)
                #     return list_movies

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
                    release_date=movie[2],
                    overview=movie[3],
                    imdb_id=movie[4],
                    poster_path=movie[5],
                    vote_average=movie[6],
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
                    release_date=movie[2],
                    overview=movie[3],
                    imdb_id=movie[4],
                    poster_path=movie[5],
                    vote_average=movie[6],
                )
