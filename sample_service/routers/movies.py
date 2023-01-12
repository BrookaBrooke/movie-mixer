from fastapi import APIRouter, Depends
from queries.movies import MovieIn, MovieRepository, MovieOut
from typing import List


router = APIRouter()


@router.post("/movies", response_model=MovieOut)
def create_movie(
    movie: MovieIn,
    repo: MovieRepository = Depends(),
):

    return repo.create(movie)


@router.get("/movies", response_model=List[MovieOut])
def get_movies(
    # movie: MovieOut,
    repo: MovieRepository = Depends(),
):

    return repo.get()


@router.get("/movies/{id}", response_model=MovieOut)
def get_movie(
    id: int,
    repo: MovieRepository = Depends(),
):

    return repo.get_one(id)
