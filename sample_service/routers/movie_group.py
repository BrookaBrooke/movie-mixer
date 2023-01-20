from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from authenticator import authenticator
from typing import List

from queries.movie_group import (
    MovieGroupRepository,
    MovieGroupIn,
    MovieGroupOut,
)

router = APIRouter()


@router.get("/movie-groups")
def read_movie_groups(
    repository: MovieGroupRepository = Depends(),
) -> List[MovieGroupOut]:
    return repository.list()


@router.get("/movie-groups-with-username")
def get_username(
    repo: MovieGroupRepository = Depends(),
) -> List[MovieGroupOut]:
    return repo.get_user()


# account_data: dict = Depends(authenticator.get_current_account_data)
# ):
# if account_data is None:
#     raise HTTPException(
#         status_code=401, detail="Not logged in"
#     )
# else:


@router.get("/movie-groups-by-user")
def get_groups_by_user(
    repo: MovieGroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> List[MovieGroupOut]:
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    else:
        return repo.list_user_groups(account_data["id"])


@router.get("/movie-groups/{movie_group_id}")
def read_movie_group(movie_group_id: int):
    repository = MovieGroupRepository()
    return repository.get(movie_group_id)


@router.post("/movie-groups")
def create_movie_group(
    movie_group: MovieGroupIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repository: MovieGroupRepository = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    else:

        movie_group.owner = account_data["id"]
        new_movie_group = repository.create(movie_group)
        return new_movie_group


@router.put("/movie-groups/{movie_group_id}")
def update_movie_group(
    movie_group_id: int,
    movie_group: MovieGroupIn,
    repository: MovieGroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> MovieGroupOut:
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not repository.get(movie_group_id):
        raise HTTPException(status_code=404, detail="Movie group not found")
    elif account_data["id"] != repository.get(movie_group_id).owner:
        raise HTTPException(
            status_code=401, detail="Not authorized to modify this list"
        )
    else:
        updated_movie_group = repository.update(movie_group_id, movie_group)
        if not updated_movie_group:
            raise HTTPException(
                status_code=404, detail="Movie group not found"
            )
        return MovieGroupOut(
            id=movie_group_id,
            name=updated_movie_group.name,
            owner=updated_movie_group.owner,
        )


@router.delete("/movie-groups/{movie_group_id}")
def delete_movie_group(
    movie_group_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repository = MovieGroupRepository()
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not repository.get(movie_group_id):
        raise HTTPException(status_code=404, detail="Movie group not found")
    elif account_data["id"] != repository.get(movie_group_id).owner:
        raise HTTPException(
            status_code=401, detail="Not authorized to modify this list"
        )
    repository.delete(movie_group_id)
    return f"Deleted movie group {movie_group_id}"
