import json
from fastapi.testclient import TestClient
from typing import List
from queries.movies import MovieRepository
from routers.movies import MovieIn, MovieOut
from authenticator import authenticator
from main import app

client = TestClient(app=app)


def get_current_account_data_mock():
    return {"id": 17, "username": "kramer"}
