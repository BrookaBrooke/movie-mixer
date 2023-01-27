from fastapi.testclient import TestClient
from typing import List
from queries.movie_group import MovieGroupRepository
from routers.movie_group import MovieGroupIn, MovieGroupOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


def get_current_account_data_mock():
    return {
        "id": 17,
        "username": "kramer",
    }


def get_movie_group_id_mock():
    return {"id": 1, "name": "Jesse Movies", "owner": 1, "username": "Jesse"}


class MovieGroupRepositoryMock:
    def create(self, movie_group: MovieGroupIn) -> MovieGroupOut:
        movie_group_dict = movie_group.dict()
        return MovieGroupOut(id=1, **movie_group_dict)

    def list(self) -> List[MovieGroupOut]:
        return []

    def get(self, movie_group_id: int) -> MovieGroupOut:
        return {
            "id": movie_group_id,
            "name": "Jesse Movies",
            "owner": 1,
            "username": "Jesse",
        }


def test_create_movie_group():
    # Arrange
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock

    movie_group_body = {
        "name": "group",
        "owner": 1,
    }

    # Act
    res = client.post("/movie-groups", json=movie_group_body)

    # Assert
    assert res.status_code == 200
    assert res.json()["id"] == 1
    assert res.json()["owner"] == 17

    # A cleanup
    app.dependency_overrides = {}


def test_get_movie_groups():
    # Arrange
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock

    id = 1

    # Act
    res = client.get("/movie-groups")

    # Assert
    assert res.status_code == 200
    assert res.json() == []
    print(res)
    # A cleanup
    app.dependency_overrides = {}


def test_get_movie_group_id():
    # Arrange
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock

    # Act
    res = client.get("/movie-groups/1")

    # Assert
    assert res.status_code == 200
    assert res.json()["id"] == 1
    assert res.json()["name"] == "Jesse Movies"
    assert res.json()["owner"] == 1
    assert res.json()["username"] == "Jesse"

    # A cleanup
    app.dependency_overrides = {}
