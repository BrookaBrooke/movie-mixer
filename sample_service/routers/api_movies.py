from fastapi import APIRouter, Depends
from typing import List
from queries.api_movies import ApiMovieQueries

router = APIRouter()


@router.get("/api-movies/search/{title}", response_model=dict | None)
def get_movies(title: str, page_num: int, repo: ApiMovieQueries = Depends()):
    return repo.get_multiple_movies(title, page_num)


@router.get("/api-movies/detail/{id}", response_model=dict)
def get_movie(id: str, repo: ApiMovieQueries = Depends()):
    return repo.get_one_movie(id)


@router.get("/api-movies/detail-with-trailer/{id}", response_model=dict)
def get_movie(id: str, repo: ApiMovieQueries = Depends()):
    return repo.get_one_movie_with_trailer(id)


@router.get("/api-movies/trailers", response_model=dict)
def get_movie_trailer_info(repo: ApiMovieQueries = Depends()):
    return repo.get_home_page_movie_trailers_with_movie_data()
