from pydantic import BaseModel
from typing import List
from queries.pool import pool


class DuplicateUserError(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str


class UserOut(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str
    first_name: str
    last_name: str


class UserRepository:
    def get_users(self):
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute("SELECT * FROM users;")
                    result = []
                    for record in db:
                        result.append(
                            UserOut(
                                id=record[0],
                                username=record[1],
                                password=record[2],
                                email=record[3],
                                first_name=record[4],
                                last_name=record[5],
                            )
                        )
                    return result

        except Exception as e:
            print(e)
            return None

    def create_user(self, user: UserIn):
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        "INSERT INTO users (username, password, email, first_name, last_name) VALUES (%s, %s, %s, %s, %s) returning id",
                        [
                            user.username,
                            user.password,
                            user.email,
                            user.first_name,
                            user.last_name,
                        ],
                    )
                    id = db.fetchone()[0]
                    data = user.dict()
                    return UserOut(id=id, **data)
        except Exception as e:
            print(e)
            return None
