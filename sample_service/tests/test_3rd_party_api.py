from fastapi.testclient import TestClient
from queries.api_movies import ApiMovieQueries
from main import app


client = TestClient(app=app)


class MockAPIQuery:
    def get_one_movie(self, id: str) -> dict:
        return {"movie_id": id}


def test_get_movie():
    # Arrange
    app.dependency_overrides[ApiMovieQueries] = MockAPIQuery
    # Act
    res = client.get("/api-movies/detail/1")
    # Assert
    assert res.status_code == 200
    assert res.json()["movie_id"] == "1"

    app.dependency_overrides = {}
