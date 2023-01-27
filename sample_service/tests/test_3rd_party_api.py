from fastapi.testclient import TestClient
from queries.api_movies import ApiMovieQueries
from routers.movies import MovieIn, MovieOut
from main import app
from typing import List


client = TestClient(app=app)


class MockAPIQuery:
    def getmovies(self):
        return []


def test_get_movies():
    # Arrange
    app.dependency_overrides[ApiMovieQueries] = MockAPIQuery()
    # Act
    res = client.get('/api-movies/detail{id}')
    # Assert
    assert res.status_code == 200
    assert res.json() == {
        "detail": [
            {
                "loc": [
                    "string",
                    0
                ],
                "msg": "string",
                "type": "string"
            }
        ]
    }

    app.dependency_overrides = {}
