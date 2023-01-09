from pydantic import BaseModel
import requests
import os

api_key = os.environ["OMDB_API_KEY"]


class ApiMovieQueries:
    def get_multiple_movies(self, title: str, page_num: int):
        results = requests.get(
            f"http://www.omdbapi.com/?apikey={api_key}&s={title}&page={page_num}&type=movie"
        )
        data = results.json()
        return data

    def get_one_movie(self, imdbID: str):
        results = requests.get(
            f"http://www.omdbapi.com/?apikey={api_key}&i={imdbID}%type=movie"
        )
        data = results.json()
        return data
