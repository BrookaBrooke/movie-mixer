from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from queries.movie_group import MovieGroupRepository

router = APIRouter()


class MovieGroup(BaseModel):
    id: int
    name: str
    owner: int


class MovieGroupIn(BaseModel):
    name: str
    owner: int


class MovieGroupOut(BaseModel):
    id: int
    name: str
    owner: int


@router.get("/movie-groups")
def read_movie_groups():
    repository = MovieGroupRepository()
    movie_groups = repository.list()
    return [
        MovieGroupOut(**movie_group.dict()) for movie_group in movie_groups
    ]


@router.post("/movie-groups")
def create_movie_group(movie_group: MovieGroupIn):
    repository = MovieGroupRepository()
    new_movie_group = repository.create(movie_group)
    return MovieGroupOut(**new_movie_group.dict())


@router.get("/movie-groups/{movie_group_id}")
def read_movie_group(movie_group_id: int):
    repository = MovieGroupRepository()
    movie_group = repository.get(movie_group_id)
    if not movie_group:
        raise HTTPException(status_code=404, detail="Movie group not found")
    return MovieGroupOut(**movie_group.dict())


@router.put("/movie-groups/{movie_group_id}")
def update_movie_group(movie_group_id: int, movie_group: MovieGroupIn):
    repository = MovieGroupRepository()
    updated_movie_group = repository.update(movie_group_id, movie_group)
    if not updated_movie_group:
        raise HTTPException(status_code=404, detail="Movie group not found")
    return MovieGroupOut(**updated_movie_group.dict())


@router.delete("/movie-groups/{movie_group_id}")
def delete_movie_group(movie_group_id: int):
    repository = MovieGroupRepository()
    movie_group = repository.delete(movie_group_id)
    if not movie_group:
        raise HTTPException(status_code=404, detail="Movie group not found")
    return MovieGroupOut(**movie_group.dict())
