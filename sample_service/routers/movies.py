from fastapi import APIRouter, Depends
from queries.movies import MovieIn, MovieRepository, MovieOut


router = APIRouter()

@router.post("/movies", response_model=MovieOut)
def create_movie(
    movie: MovieIn,
    repo: MovieRepository = Depends(),
):

    return repo.create(movie)



@router.get("/movies")
def get_movies():
    pass
