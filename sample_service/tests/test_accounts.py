# import json
# from fastapi.testclient import TestClient
# from typing import List, Dict, Any
# from queries.accounts import AccountIn, AccountRepo, Account
# from routers.accounts import AccountOut, AccountIn, AccountRepo, AccountToken
# from authenticator import authenticator
# from main import app


# client = TestClient(app=app)

# class AccountRepoMock:
#   def create(self, account: AccountIn, hashed_password: str):
#     return {
#                 "id": 1,
#                 "username": "Jesse",
#                 "email": "jesse@gmail.com",
#                 "hashed_password": "string",
#                 "first_name": "jesse",
#                 "last_name": "morris"
#             }
#   def get(self, username: str):
#     return Account
#   # def get_current_account_data_mock():

# def test_create_account_unauthenticated():
#   app.dependency_overrides[AccountRepo] = AccountRepoMock
#   item_body = {
#         "username": "string",
#         "password": "string",
#         "email": "string",
#         "hashed_password": "string",
#         "first_name": "string",
#         "last_name": "string"
#     }

#   res = client.post("/api/accounts", json=item_body)

#   assert res.status_code == 401
#   assert res.json()["detail"] == "Invalid token"

#   app.dependency_overrides = {}

  # app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
