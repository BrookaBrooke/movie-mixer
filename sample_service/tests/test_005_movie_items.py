from fastapi.testclient import TestClient
from typing import List, Dict, Any
from queries.movie_item import (
    MovieItemRepository,
    MovieItemIn,
    MovieItemOut,
    MovieGroupItem,
)
from queries.movie_group import MovieGroupRepository, MovieGroupOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


class MovieItemRepositoryMock:
    def create(self, item: MovieItemIn) -> MovieItemOut:
        item_dict = item.dict()
        return MovieItemOut(id=1, **item_dict)

    def get(self) -> List[MovieItemOut]:
        return []

    def get_detail(self, id) -> MovieItemOut:
        return id

    def get_list(self, movie_group_id) -> List[MovieGroupItem]:
        return []

    def delete(self, id: int) -> Dict[str, Any]:
        return id


def get_current_account_data_mock_id1():
    return {"id": 1, "username": "one"}


def get_current_account_data_mock_id2():
    return {"id": 2, "username": "two"}


class MovieGroupRepositoryMock:
    def get(self, id):
        return MovieGroupOut(id=id, owner=1, name="favorites")


def test_get_items():
    # Arrange
    app.dependency_overrides[MovieItemRepository] = MovieItemRepositoryMock

    # Act
    res = client.get("/movie_items")

    # Assert
    assert res.status_code == 200
    assert res.json() == []

    # A cleanup
    app.dependency_overrides = {}


def test_add_movie_item_unauthenticated():
    # Arrange
    app.dependency_overrides[MovieItemRepository] = MovieItemRepositoryMock
    item_body = {
        "movie_id": 1,
        "movie_group_id": 1,
        "item_position": 0,
    }

    # Act
    res = client.post("/movie_items", json=item_body)

    # Assert
    assert res.status_code == 401
    assert res.json()["detail"] == "Invalid token"

    # A cleanup
    app.dependency_overrides = {}


def test_add_movie_item_authorized():
    # Arrange
    app.dependency_overrides[MovieItemRepository] = MovieItemRepositoryMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock_id1
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock
    item_body = {
        "movie_id": 1,
        "movie_group_id": 1,
        "item_position": 0,
    }

    # Act
    res = client.post("/movie_items", json=item_body)

    # Assert
    assert res.status_code == 200

    # A cleanup
    app.dependency_overrides = {}


def test_add_movie_item_unauthorized():
    # Arrange
    app.dependency_overrides[MovieItemRepository] = MovieItemRepositoryMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock_id2
    app.dependency_overrides[MovieGroupRepository] = MovieGroupRepositoryMock
    item_body = {
        "movie_id": 1,
        "movie_group_id": 1,
        "item_position": 0,
    }

    # Act
    res = client.post("/movie_items", json=item_body)

    # Assert
    assert res.status_code == 401
    assert res.json()["detail"] == "User not authorized for this list"

    # A cleanup
    app.dependency_overrides = {}
