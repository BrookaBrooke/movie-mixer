from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


class MovieOut(BaseModel):
    id: int
    title: str
    released: date
    plot: str
    imdbID: str
    poster: str
    vote_avr: float


class MovieIn(BaseModel):
    title: str
    released: date
    plot: str
    imdbID: str
    poster: str
    vote_avr: float


class MovieRepository:
    def create(self, movie: MovieIn) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO movies (
                        title, release_date, overview, imdb_id, poster_path, vote_average
                    )
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        movie.title,
                        movie.released,
                        movie.plot,
                        movie.imdbID,
                        movie.poster,
                        movie.vote_avr,
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
                        rated=record[4],
                        imdbID=record[5],
                        poster=record[6],
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

    def get_one(self, id) -> MovieOut:
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
                movie = list(db.fetchone())
                return MovieOut(
                    id=movie[0],
                    title=movie[1],
                    released=movie[2],
                    plot=movie[3],
                    rated=movie[4],
                    imdbID=movie[5],
                    poster=movie[6],
                )
