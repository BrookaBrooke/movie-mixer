# MovieMixer

- Jesse Morris
- Jalen Gill
- Ben Gerber
- Brooke Vonderheid
- Michel Menin

MovieMixer - Movies for fans.

MovieMixer - Collect and share your favorites.

---

## Intended Market

Movie fans, amateurs or newbies who want to find something else to watch.

---

## Functionality

#### Deliverable

- Vistors who are not registered can search for movie titles.
- Visitors can open (register) an account on the site which will give them access to creating/editing personalized lists of favorites.
- Registered users can add movies to their own lists from either the search results page or the movie detail page.
- Users can edit the order of their movies in their list, but not other users' lists.
- Movie detail page shows a short description taken from a 3rd party API and has a trailer available to see.
- Movie trivia game with multiple-choice answers.

#### Strecth goal(s) Functionality

- Trivia High-scrore

---

## Project Initialization

1. Clone the repo to your local machine.
2. `cd` into the new project directory.
3. Run `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it module3-project-gamma-fastapi-1 bash`
7. Run `python -m migrations up`
8. Run `python -m migrations populate` to add some data
9. Exit the container's CLI, and enjoy MovieMixer!
10. Try logging in with one of the sample users:
    - user : `one`
    - password : `pass`

---

## Deliverables

- [x] Wire-frame diagrams
- [x] API documentation
- [ ] Project is deployed to **\_\_**Render.com/GitLab-pages**\_\_**
- [ ] Journals

---

## Design

- [Api Design](/docs/api-design.md "/docs/api-design.md")
- [Data Models](/docs/data-models.md "/docs/data-models.md")
- [GHI](/docs/ghi.md "/docs/ghi.md")
- [Integrations](/docs/integrations.md "/docs/integrations.md")

## Tests:

- [tests/test_005_movie_items](tests/test_005_movie_items) / [Michel Menin]
  - test_get_items, test_add_movie_item_unauthenticated, test_add_movie_item_unauthorized, test \_add_movie_item_authorized
- [tests/test_movie_groups](tests/test_movie_groups) / [Ben Gerber]
  - test_create_movie_group, test_get_movie_groups'
- [tests/test_movies](tests/test_movies) / [Jalen Gill]
  - test_create_movie, test_get_movies
  [tests/test_movie_groups](tests/test_movie_groups) / [Jesse Morris]
  - test_get_movie_group_id
- [tests/test_3rd_party_api](tests/test_3rd_party_api.py) / [Brooke Vonderheid]
  - test_get_movies
