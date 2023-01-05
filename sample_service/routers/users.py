from fastapi import APIRouter, Depends
from queries.users import UserIn, UserOut, UsersOut, UserRepository


router = APIRouter()

@router.get("/users",response_model=UsersOut)
def user_list():
    return {
        "users": [
            {
                "id": 1,
                "username": "bob",
                "password": "666",
                "email": "upchh@example.com",
                "first_name": "John ",
                "last_name": "Doe"
            }]
    }

@router.put("/users", response_model=UserOut)
def update_user():
    return {"message": "Hello World"}


@router.delete("/users", response_model=UserOut)
def delete_user():
    return {"message": "Hello World"}


@router.post("/users", response_model=UserOut)
def create_user(user:UserIn, repo:UserRepository = Depends()):
    return repo.create_user(user)
