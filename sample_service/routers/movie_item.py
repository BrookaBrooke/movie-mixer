from fastapi import APIRouter, Depends, HTTPException
from queries.movie_item import MovieItemIn, MovieItemRepository, MovieItemOut, MovieGroupItem, ItemPosition
from typing import List


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

@router.get("/movie_group_items/{movie_group_id}", response_model=List[MovieGroupItem])
def get_movie_group_items(
    movie_group_id: int,
    repo: MovieItemRepository = Depends()
    ):
    return repo.get_list(movie_group_id)

@router.put("/movie_items/{movie_item_id}")
def update_movie_item(movie_item_id: int, movie_item: ItemPosition):
    repo = MovieItemRepository()
    updated = repo.update_one(movie_item_id, movie_item)
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update movie item")
    return ItemPosition(
            id=movie_item_id,
            item_position=updated.item_position
        )
          
@router.put("/movie_items/", response_model=List[ItemPosition])
def update_movie_items(items: List[ItemPosition]):
    repo = MovieItemRepository()
    updated = repo.update_many(items)
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update movie item")
    return updated 
  
# @router.put("/movie-groups/{movie_group_id}")
# def update_movie_group(movie_group_id: int, movie_group: MovieGroupIn):
#     repository = MovieGroupRepository()
#     updated_movie_group = repository.update(movie_group_id, movie_group)
#     if not updated_movie_group:
#         raise HTTPException(status_code=404, detail="Movie group not found")
#     return MovieGroupOut(
#         id=movie_group_id,
#         name=updated_movie_group.name,
#         owner=updated_movie_group.owner,
#     )