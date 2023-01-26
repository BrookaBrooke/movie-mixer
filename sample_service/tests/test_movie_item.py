# import json
# from fastapi.testclient import TestClient
# from queries.movie_item import MovieItemRepository
# from routers.movie_item import MovieItemIn, MovieItemOut
# from authenticator import authenticator
# from main import app

# client = TestClient(app=app)

# def get_account_data_for_cookie_mock():


# class MovieItemRepositoryMock():
#     def create(self, movieitem: MovieItemIn) -> MovieItemOut:
#       movieitem_dict = movieitem.dict()
#       return MovieItemOut(id=1, **movieitem_dict)



# def test_create_movie_item():
#   # Arrange
#   app.dependency_overrides[MovieItemRepository] = MovieItemRepositoryMock
#   app.dependency_overrides[authenticator.get_account_data_for_cookie] = get_account_data_for_cookie_mock
#   movie_item_body = {
#     "movie_id": 1,
#     "movie_group_id": 1,
#     "item_position": 0,
#   }

#   # Act
#   res = client.post("/movie_items", json=movie_item_body)

#   # Assert
#   assert res.status_code == 200
#   assert res.json()['id'] == 1
#   assert res.json()['movie_id'] == 3

#   # A cleanup
#   app.dependency_overrides = {}
