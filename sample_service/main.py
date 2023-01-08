from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from requests import get
import os

from routers import movies, movie_group, accounts, movie_item
from authenticator import authenticator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
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

@app.get("/api/movie-search")
def movie_search():
    response = get('http://www.omdbapi.com/?i=tt3896198&apikey=ec4483b8')
    pass
