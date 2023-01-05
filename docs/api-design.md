### Log in

- Endpoint path: /login
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```

### Log out

- Endpoint path: /logout
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

### Sign up

- Endpoint path: /signup
- Endpoint method: POST

- Headers:

  - None

- Request Body:

  ```json
  {
  		"username": string,
  		"password": string,
  		"email": string,
  	}
  ```

- Response: Creates a new user
- Response shape (JSON):
  ```json
  {
  		"success": boolean,
  		"message": string
  	}
  ```

### Movie Object

### Create Movie

- Endpoint path: /movies
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:
  ```json
  {
  "Title": string,
  "Year": string,
  "Plot": string,
  "Rated": string,
  "imdbID": string,
  "Poster": string,

}
```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Delete Movie

- Endpoint path: /movies/movie_id
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Update Movie

- Endpoint path: /movies/movie_id
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Get a list of Movies

- Endpoint path: /movies
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of Movies
- Response shape:
  ```json
  {
    "movies": [
      {
  	      "Title": string,
  				"Year": string,
  				"Rated": string,
  				"imdbID": string,
  				"Poster": string,
      }
    ]
  }
  ```

### Get a list of Movies based on Movie List

- Endpoint path: /movies/list_id
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of Tweets
- Response shape:
  ```json
  {
    "movies": [
      {
  	      "Title": string,
  				"Year": string,
  				"Rated": string,
  				"imdbID": string,
  				"Poster": string,
      }
    ]
  }
  ```

### Movie Detail

- Endpoint path: /movies/{movie_id}
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of Tweets
- Response shape:
  ```json
  {
  	  "Title": string,
  		"Year": string,
  		"Plot": string,
  		"Rated": string,
  		"imdbID": string,
  		"Poster": string,
  }
  ```

### MovieList Object

### Get a list of MovieLists

- Endpoint path: /lists
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of MovieLists
- Response shape:
  ```json
  {
    "Lists": [
      {
  	  "id": int,
        "name": string,
        "user_id": string,
      }
    ]
  }
  ```

### Get a list of MovieLists by User id

- Endpoint path: /lists/{user_id}
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of Tweets
- Response shape:
  ```json
  {
    "Lists": [
      {
  	  "id": int,
        "name": string,
        "user_id": string,
      }
    ]
  }
  ```
