# API Design

-- --
##  - - Accounts - - 

### Log in

- Endpoint path: /token
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

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

### Sign up

- Endpoint path: /api/accounts
- Endpoint method: POST

- Headers:

  - None

- Request Body:

  ```json
  {
    "username": string,
    "email": string,
    "first_name": string,
    "last_name": string,
    "hashed_password": string,
  }
  ```

- Response: Creates a new user
- Response shape (JSON):
  ```json
  {
      "access_token": string,
      "token_type": "Bearer",
      "account": {
          "id": int,
          "username": string,
          "email": string,
          "first_name": string,
          "last_name": string
        }
    }
  ```
-- --
## - - Movie Object - -

### Create Movie

- Endpoint path: /movies
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:
  ```json
  {
    "title": string,
    "released": datetime,
    "plot": string,
    "imdbID": string,
    "poster": string,
    "vote_avr": int,
    "api3_id": int
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "id": int,
    "title": string,
    "released": datetime,
    "plot": string,
    "imdbID": string,
    "poster": string,
    "vote_avr": int,
    "api3_id": int
  }
  ```

### Delete Movie

* not used

### Update Movie

* not used

### Search for Movies by Title
- Endpoint path: /api-movies/search/{q}?page_num={p}
- Endpoint method: GET
- Query parameters:
  - q: the word(s) to search for
  - p: page number
- Response: A list of Movies and details
- Response example:
  ```json
  {
    "page": 1,
    "results": [
      {
        "adult": false,
        "backdrop_path": "/aDYSnJAK0BTVeE8osOy22Kz3SXY.jpg",
        "genre_ids": [
          12,
          28,
          878
        ],
        "id": 11,
        "original_language": "en",
        "original_title": "Star Wars",
        "overview": "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
        "popularity": 69.276,
        "poster_path": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        "release_date": "1977-05-25",
        "title": "Star Wars",
        "video": false,
        "vote_average": 8.2,
        "vote_count": 18170
      },
      {
        "adult": false,
        "backdrop_path": "/k6EOrckWFuz7I4z4wiRwz8zsj4H.jpg",
        "genre_ids": [
          12,
          28,
          878,
          14
        ],
        "id": 140607,
        "original_language": "en",
        "original_title": "summary",
        "popularity": 50.839,
        "poster_path": "/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
        "release_date": "2015-12-15",
        "title": "Star Wars: The Force Awakens",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 17683
      },
      ...
    ],
    "total_pages": 7,
    "total_results": 136
  }
  ```

### Get a list of Movies

- Endpoint path: /movies
- Endpoint method: GET
- Response: A list of Movies
- Response shape:
  ```json
  [
    {
      "id": int,
      "title": string,
      "released": datetime,
      "plot": string,
      "imdbID": string,
      "poster": string,
      "vote_avr": string,
      "api3_id": int
    },
    ...
  ]
  ```



### Movie Detail

- Endpoint path: /api-movies/detail/{movie_id}
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of Tweets
- Response example:
  ```json
  {
    "adult": false,
    "backdrop_path": "/goNk0VDnUjxKjB6o69kYS5vvZo2.jpg",
    "belongs_to_collection": {
      "id": 115570,
      "name": "Star Trek: The Next Generation Collection",
      "poster_path": "/jYtNUfMbU6DBbmd4LUS19u4hF4p.jpg",
      "backdrop_path": "/r7MMQenUURHhAVHFymtOb8AX4Bm.jpg"
    },
    "budget": 70000000,
    "genres": [
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
    ],
    "homepage": "",
    "id": 200,
    "imdb_id": "tt0120844",
    "original_language": "en",
    "original_title": "Star Trek: Insurrection",
    "overview": "When an alien race and factions within Starfleet attempt to take over a planet that has \"regenerative\" properties, it falls upon Captain Picard and the crew of the Enterprise to defend the planet's people as well as the very ideals upon which the Federation itself was founded.",
    "popularity": 15.885,
    "poster_path": "/xQCMAHeg5M9HpDIqanYbWdr4brB.jpg",
    "production_companies": [
      {
        "id": 4,
        "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
        "name": "Paramount",
        "origin_country": "US"
      },
      {
        "id": 76068,
        "logo_path": null,
        "name": "Digital Image Associates",
        "origin_country": ""
      }
    ],
    "production_countries": [
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
    ],
    "release_date": "1998-12-11",
    "revenue": 118000000,
    "runtime": 103,
    "spoken_languages": [
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      }
    ],
    "status": "Released",
    "tagline": "The battle for paradise has begun.",
    "title": "Star Trek: Insurrection",
    "video": false,
    "vote_average": 6.423,
    "vote_count": 1000
  }
  ```

-- --
## - - MovieGroups Object  - -


### Get a list of Movie Groups

- Endpoint path: /movie-groups
- Endpoint method: GET
- Query parameters:

  - q: the word(s) to search for

- Headers:

  - Authorization: Bearer token

- Response: A list of MovieGroups
- Response shape:
  ```json
  [
    {
      "id": int,
      "name": string,
      "owner": int
    },
    ...
  ]
  ```

### Get a list of Movie Groups by User id

- Endpoint path: /movie-groups-by-user/{user_id}
- Endpoint method: GET

- Response: A list of Movie Groups
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

-- --
## - - Movie Items - -

### Get a list of Movies based on Movie List

- Endpoint path: /movie_items/{group_id}
- Endpoint method: GET

- Response: A list of movie items (movies)
- Response shape:
  ```json
  [
    {
      "id": int,
      "item_position": int,
      "movie_id": int,
      "title": string
    },
    ...
  ]
  ```

### Create a Movie Item in a Movie Group

- Endpoint path: /movie_items/
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Body: A list of movie items
  ```json
  {
    "movie_id": int,
    "movie_group_id": int,
    "item_position": int
  }
  ```
- Response shape:
  ```json
  {
    "id": int,
    "movie_id": int,
    "movie_group_id": int,
    "item_position": int
  }
  ```

### Update Movie Items in a Movie Group

- Endpoint path: /movie_items/
- Endpoint method: PUT
- Headers:
  - Authorization: Bearer token
- Body: A list of movie items
  ```json
  [
    {
      "id": int,
      "item_position": int
    },
    ...
  ]
  ```
- Response: A list of movie items (movies)
- Response shape:
  ```json
  [
    {
      "id": int,
      "item_position": int
    },
    ...
  ]
  ```