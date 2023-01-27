from fastapi.testclient import TestClient
from typing import List
from queries.movies import MovieRepository
from routers.movies import MovieIn, MovieOut
from main import app

client = TestClient(app=app)


class MovieRepositoryMock:
    def create(self, movie: MovieIn) -> MovieOut:
        movie_dict = movie.dict()
        return MovieOut(id=1, **movie_dict)

    def get(self) -> List[MovieOut]:
        return []

    def get_one(self, id) -> MovieOut:
        return id


def test_create_movie():
    # Arrange
    app.dependency_overrides[MovieRepository] = MovieRepositoryMock
    movie_body = {
        "title": "Movie 1",
        "released": "2000-12-31",
        "plot": "This is a movie",
        "imdbID": "tt1956834",
        "poster": "/thisisapath3943234",
        "vote_avr": 7.9,
        "api3_id": 3,
    }

    # Act
    res = client.post("/movies", json=movie_body)

    # Assert
    assert res.status_code == 200

    # A cleanup
    app.dependency_overrides = {}


def test_get_movies():
    # Arrange
    app.dependency_overrides[MovieRepository] = MovieRepositoryMock

    # Act
    res = client.get("/movies")

    # Assert
    assert res.status_code == 200
    assert res.json() == []

    # A cleanup
    app.dependency_overrides = {}
