from pydantic import BaseModel
import requests
import os

api_key = os.environ["THE_MOVIE_DB_API_KEY"]


class ApiMovieQueries:
    def get_multiple_movies(self, title: str, page_num: int):
        results = requests.get(
            f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={title}&page={page_num}"
        )
        data = results.json()
        return data

    def get_one_movie(self, id: str):
        results = requests.get(
            f"https://api.themoviedb.org/3/movie/{id}?api_key={api_key}"
        )
        data = results.json()
        return data

    def get_one_trailer(self, id: str):
        results = requests.get(
            f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={api_key}&language=en-US"
        )

        # trailer = None
        # while not trailer:
        data = results.json()
        for result in data["results"]:
            if result["type"] == "Trailer":
                trailer = result
                break
        return trailer
