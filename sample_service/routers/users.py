from fastapi import APIRouter, Depends
from typing import List
from queries.users import UserIn, UserOut, UserRepository


router = APIRouter()


@router.get("/users", response_model=List[UserOut])
def user_list(repo: UserRepository = Depends()):
    return repo.get_users()


@router.put("/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserRepository = Depends(),
):
    return repo.update_user(user_id, user)


@router.delete("/users/{user_id}", response_model=UserOut)
def delete_user(
    user_id: int,
    user: UserIn,
    repo: UserRepository = Depends(),
):
    return repo.delete_user(user_id, user)


@router.post("/users", response_model=UserOut)
def create_user(user: UserIn, repo: UserRepository = Depends()):
    return repo.create_user(user)
