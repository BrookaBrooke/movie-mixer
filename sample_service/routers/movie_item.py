from fastapi import APIRouter, Depends, HTTPException
from queries.movie_item import MovieItemIn, MovieItemRepository, MovieItemOut, MovieGroupItem, ItemPosition
from typing import List, Dict, Any


router = APIRouter()


@router.post("/movie_items", response_model=MovieItemOut)
def create_movie_item(
    movie: MovieItemIn,
    repo: MovieItemRepository = Depends(),
):

    return repo.create(movie)


@router.get("/movie_items", response_model=List[MovieItemOut])
def get_movie_items(
    repo: MovieItemRepository = Depends(),
    ):
    return repo.get()

@router.get("/movie_items/{movie_group_id}", response_model=List[MovieGroupItem])
def get_movie_group_items(
    movie_group_id: int,
    repo: MovieItemRepository = Depends()
    ):
    return repo.get_list(movie_group_id)
          
@router.put("/movie_items/", response_model=List[ItemPosition])
def update_movie_items(items: List[ItemPosition]):
    repo = MovieItemRepository()
    updated = repo.update(items)
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update movie items")
    return updated 

@router.delete("/movie_items/{item_id}")  
def delete_movie_item(item_id: int):
    repository = MovieItemRepository()
    movie_item = repository.delete(item_id)
    if not movie_item:
        raise HTTPException(status_code=400, detail="Could not delete movie item")
    return f"Deleted movie item {item_id}"