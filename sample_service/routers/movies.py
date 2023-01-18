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
    repo: MovieRepository = Depends(),
):

    return repo.get()


@router.get("/movies/ids/{ids}", response_model=List[MovieOut])
def get_movies_by_ids(
    ids: str,
    repo: MovieRepository = Depends(),
):
    return repo.list_by_ids(ids)


@router.get("/movies/{imdb_id}", response_model=MovieOut)
def get_movie_by_imdb_id(
    imdb_id: str,
    repo: MovieRepository = Depends(),
):

    return repo.get_by_imdb_id(imdb_id)


@router.get("/movies/id/{id}", response_model=MovieOut)
def get_movie_by_id(
    id: int,
    repo: MovieRepository = Depends(),
):

    return repo.get_by_id(id)
