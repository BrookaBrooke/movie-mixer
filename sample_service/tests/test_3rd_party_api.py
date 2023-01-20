from fastapi.testclient import TestClient
from main import app

client = TestClient(app=app)


def test_get_api():
    # Arrange

    # Act
    res = client.get('/api/')
    # Assert
    assert res.status_code == 200
