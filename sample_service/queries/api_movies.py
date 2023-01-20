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

    def get_home_page_movie_trailers_with_movie_data(self):
        sampleMovieIds = [
            315162,
            299534,
            675353,
            76600,
            181812,
            661374,
            568124,
            634649,
            361743,
            550988,
        ]

        random.shuffle(sampleMovieIds)
        usedIds = sampleMovieIds[:5]
        results = []
        for id in usedIds:
            movie_results = requests.get(
                f"https://api.themoviedb.org/3/movie/{id}?api_key={api_key}"
            )
            trailer_results = requests.get(
                f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={api_key}&language=en-US"
            )

            movie_data = movie_results.json()
            trailer_data = trailer_results.json()
            for result in trailer_data["results"]:
                if result["type"] == "Trailer":
                    trailer_data = result
                    break
            movie_data["trailer"] = trailer_data
            results.append(movie_data)

        # trailer = None
        # while not trailer:

        return results
