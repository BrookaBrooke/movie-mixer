from fastapi.testclient import TestClient
from queries.api_movies import ApiMovieQueries
from routers.movies import MovieIn, MovieOut
from main import app
from typing import List


client = TestClient(app=app)


class MockAPIQuery:
    def get(self) -> List[MovieOut]:
        return []


def test_search_movies():
    # Arrange
    app.dependency_overrides[ApiMovieQueries] = MockAPIQuery()
    # Act
    res = client.get('/api-movies/search/{title}')
    # Assert
    assert res.status_code == 200
    assert res.json() == []

    app.dependency_overrides = {}
