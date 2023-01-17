from fastapi import APIRouter, Depends, HTTPException
from queries.movie_item import (
    MovieItemIn,
    MovieItemRepository,
    MovieItemOut,
    MovieGroupItem,
    ItemPosition,
    Error,
)
from queries.movie_group import MovieGroupRepository
from typing import List
from authenticator import authenticator

router = APIRouter()

response_model = MovieItemOut | Error


@router.post("/movie_items")
def create_movie_item(
    movie: MovieItemIn,
    repo: MovieItemRepository = Depends(),
    owner: MovieGroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    movie_group_data = owner.get(account_data["id"])
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif movie_group_data.owner == account_data["id"]:
        return repo.create(movie)
    else:
        raise HTTPException(
            status_code=401, detail="User not authorized for this list"
        )


@router.get("/movie_items", response_model=List[MovieItemOut])
def get_movie_items(
    repo: MovieItemRepository = Depends(),
):
    return repo.get()


@router.get(
    "/movie_items/{movie_group_id}", response_model=List[MovieGroupItem]
)
def get_movie_group_items(
    movie_group_id: int, repo: MovieItemRepository = Depends()
):
    return repo.get_list(movie_group_id)


@router.put("/movie_items/", response_model=List[ItemPosition])
def update_movie_items(
    items: List[ItemPosition], repo: MovieItemRepository = Depends()
):
    updated = repo.update(items)
    if not updated:
        raise HTTPException(
            status_code=400, detail="Failed to update movie items"
        )
    return updated


@router.delete("/movie_items/{item_id}")
def delete_movie_item(
    item_id: int,
    repo: MovieItemRepository = Depends(),
    owner: MovieGroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    movie_group_data = owner.get(account_data["id"])
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif movie_group_data.owner == account_data["id"]:
        movie_item = repo.delete(item_id)
        if not movie_item:
            raise HTTPException(
                status_code=400, detail="Failed to delete movie item"
            )
        return f"Deleted movie item {item_id}"
    else:
        raise HTTPException(
            status_code=401,
            detail="User not authorized to delete items from this list",
        )
