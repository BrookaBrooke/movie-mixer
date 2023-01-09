from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from queries.movie_group import (
    MovieGroupRepository,
    MovieGroup,
    MovieGroupIn,
    MovieGroupOut,
)

router = APIRouter()


@router.get("/movie-groups")
def read_movie_groups():
    repository = MovieGroupRepository()
    return repository.list()


@router.post("/movie-groups")
def create_movie_group(movie_group: MovieGroupIn):
    repository = MovieGroupRepository()
    new_movie_group = repository.create(movie_group)
    return new_movie_group


@router.get("/movie-groups/{movie_group_id}")
def read_movie_group(movie_group_id: int):
    repository = MovieGroupRepository()
    return repository.get(movie_group_id)


@router.put("/movie-groups/{movie_group_id}")
def update_movie_group(movie_group_id: int, movie_group: MovieGroupIn):
    repository = MovieGroupRepository()
    updated_movie_group = repository.update(movie_group_id, movie_group)
    if not updated_movie_group:
        raise HTTPException(status_code=404, detail="Movie group not found")
    return MovieGroupOut(
        id=movie_group_id,
        name=updated_movie_group.name,
        owner=updated_movie_group.owner,
    )


@router.delete("/movie-groups/{movie_group_id}")
def delete_movie_group(movie_group_id: int):
    repository = MovieGroupRepository()
    movie_group = repository.delete(movie_group_id)
    if not movie_group:
        raise HTTPException(status_code=404, detail="Movie group not found")
    return f"Deleted movie group {movie_group_id}"
