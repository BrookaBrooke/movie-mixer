# DATA MODELS

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

The `movies` table contains basic identifiable information of movies that have been added to moviegroups.

-- --

# Movie Groups
|name  |type   |unique  |optional |
|------|-------|--------|---------|
|id | SERIAL PRIMARY KEY | yes | no |