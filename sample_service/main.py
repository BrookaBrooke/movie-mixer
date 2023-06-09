from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import movies, movie_group, accounts, movie_item, api_movies
from authenticator import authenticator

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        os.environ.get("CORS_HOST", "https://team-06-we-dont-byte.gitlab.io"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(api_movies.router)
app.include_router(movie_group.router)
app.include_router(accounts.router)
app.include_router(movie_item.router)
app.include_router(authenticator.router)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST",
        }
    }
