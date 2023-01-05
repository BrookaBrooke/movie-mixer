from pydantic import BaseModel
from typing import List
from queries.pool import pool


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str

class UserOut(BaseModel):
    id: int
    username: str
    password: str
    email: str
    first_name: str
    last_name: str

class UsersOut(BaseModel):
    users: List[UserOut]

class UserRepository():
    def create_user(self, user:UserIn):
        try:

            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        "INSERT INTO users (username, password, email, first_name, last_name) VALUES (%s, %s, %s, %s, %s) returning id",  [
                            user.username,
                            user.password,
                            user.email,
                            user.first_name,
                            user.last_name
                        ]
                    )
                    id = db.fetchone()[0]
                    data =  user.dict()
                    return UserOut(id=id, **data)
        except Exception as e:
            print(e)
            return None



