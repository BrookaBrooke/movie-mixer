from pydantic import BaseModel
from datetime import date
from queries.pool import pool

class MovieOut(BaseModel):
    id: int
    title: str
    released: date
    plot: str
    rated: str
    imdbID: str
    poster: str


class MovieIn(BaseModel):
    title: str
    released: date
    plot: str
    rated: str
    imdbID: str
    poster: str

class MovieRepository:
    def create(self, movie: MovieIn) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movies (title, released, plot, rated, imdbID, poster)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        movie.title,
                        movie.released,
                        movie.plot,
                        movie.rated,
                        movie.imdbID,
                        movie.poster
                    ]
                )
                id = result.fetchone()[0]
                data = movie.dict()
                print(result.fetchone())
                return MovieOut(id=id, **data)
