from pydantic import BaseModel
from typing import List
from queries.pool import pool


class DuplicateAccountError(BaseModel):
    message: str


class Account(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    hashed_password: str


class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str


class AccountRepo:
    def get(self, username: str):
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                    SELECT id
                         , username
                         , email
                         , first_name
                         , last_name
                         , hashed_password
                    FROM accounts
                    WHERE username = %s;
                    """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return Account(
                        id=record[0],
                        username=record[1],
                        email=record[2],
                        first_name=record[3],
                        last_name=record[4],
                        hashed_password=record[5],
                    )

        except Exception as e:
            print(e)
            return None

    def create(self, account: AccountIn, hashed_password: str):
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts (
                            username
                            , email
                            , first_name
                            , last_name
                            , hashed_password
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            account.username,
                            account.email,
                            account.first_name,
                            account.last_name,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    return Account(
                        id=id,
                        username=account.username,
                        email=account.email,
                        hashed_password=hashed_password,
                        first_name=account.first_name,
                        last_name=account.last_name,
                    )
        except Exception as e:
            print(e)
            return None
