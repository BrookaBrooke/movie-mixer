from pydantic import BaseModel
import requests
import os
import random

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

    def get_one_movie_with_trailer(self, id: str):
        movie_results = requests.get(
            f"https://api.themoviedb.org/3/movie/{id}?api_key={api_key}"
        )
        movie_data = movie_results.json()
        trailer_results = requests.get(
            f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={api_key}&language=en-US"
        )
        trailer_data = trailer_results.json()
        movie_trailer = None
        for trailer in trailer_data["results"]:
            if trailer["type"] == "Trailer" and trailer["site"] == "YouTube":
                movie_trailer = trailer
                break

        movie_data["trailer"] = movie_trailer

        # trailer = None
        # while not trailer:

        return movie_data

    def get_home_page_movie_trailers_with_movie_data(self):
        movie_results = requests.get(
            f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1"
        )
        movie_data = movie_results.json()
        random.shuffle(movie_data["results"])
        movie_data["results"] = movie_data["results"][:5]
        for movie in movie_data["results"]:
            id = movie["id"]
            trailer_results = requests.get(
                f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={api_key}&language=en-US"
            )
            trailer_data = trailer_results.json()
            movie_trailer = None
            for trailer in trailer_data["results"]:
                if trailer["type"] == "Trailer":
                    movie_trailer = trailer
                    break

            movie["trailer"] = movie_trailer

        # trailer = None
        # while not trailer:

        return movie_data
