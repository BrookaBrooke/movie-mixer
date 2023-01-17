import json
from fastapi.testclient import TestClient
from typing import List
from queries.movie_group import MovieGroupRepository
from routers.movie_group import MovieGroupIn, MovieGroupOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


class MovieGroupRepositoryMock:
    def create(self, movie_group: MovieGroupIn) -> MovieGroupOut:
        movie_group_dict = movie_group.dict()
        return MovieGroupOut(id=1, **movie_group_dict)

    def get(self) -> List[MovieGroupOut]:
        return []

    def get_one(self, id) -> MovieGroupOut:
        return id


def test_create_movie_group():
    # Arrange
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock
    movie_group_body = {
        "id": 1,
        "name": "group",
        "owner": 1,
    }

    # Act
    res = client.post("/movie-groups", json=movie_group_body)

    # Assert
    assert res.status_code == 200

    # A cleanup
    app.dependency_overrides = {}


def test_get_movie_groups():
    # Arrange
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock

    # Act
    res = client.get("/movie-groups")

    # Assert
    assert res.status_code == 200
    assert res.json() == []

    # A cleanup
    app.dependency_overrides = {}
