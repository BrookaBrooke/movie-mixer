# DATA MODELS

-- --
# Accounts

|name  |type   |unique  |optional |
|------|-------|--------|---------|
id | SERIAL PRIMARY KEY | yes | no |
username | VARCHAR(20) | yes | no |
email | VARCHAR(50) | yes | no |
first_name | VARCHAR(50) | no | no |
last_name | VARCHAR(50) | no | no |
hashed_password | VARCHAR(1000) | no | no |

-- --
# Movies

|name  |type   |unique  |optional |
|------|-------|--------|---------|
|id | SERIAL PRIMARY KEY | yes | no |
|title | VARCHAR(255) | no | no |
|release_date | DATE | no | no |
|overview | TEXT | no | yes |
|imdb_id | VARCHAR(15) | no | no |
|poster_path | VARCHAR(1000) | no | no |
|vote_average | FLOAT | no | yes |
|api3_id | INT | no | yes |

The `movies` table contains basic identifiable information of movies that have been added to `movie_groups`.

-- --
# Movie Groups
|name  |type   |unique  |optional | foreign key |
|------|-------|--------|---------|----------|
| id | SERIAL PRIMARY KEY | yes | no |
| name | VARCHAR(100) | no | no |
| owner | INTEGER | no | no | accounts(id)|

The `movie_groups` table contains the name of the movie group (list) and the related `owner_id`

-- --
# Movie Items
|name  |type   |unique  |optional | foreign key | on delete |
|------|-------|--------|---------|----------|-----|
| id | SERIAL PRIMARY KEY | yes | no |
| movie_id | INTEGER | no | no | movies(id),
| movie_group_id | INTEGER | no | no | movie_groups(id) | CASCADE |
| item_position | INTEGER | no | yes |

The `movie_items` table contain items which relate a movie in the database to a movie_group (list).  If a related `movie_group` is deleted, it will delete the movie item.
