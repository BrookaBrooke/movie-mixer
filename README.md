# MovieMixer

* Jesse Morris
* Jalen Gill
* Ben Gerber
* Brooke Vonderheid
* Michel Menin

MovieMixer - Movies for fans.

MovieMixer - Collect and share your favorites.

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Intended Market

Movie fans, amateurs or newbies who want to find something else to watch.

## Functionality

* Vistors who are not registered can search for movie titles.
* Visitors can open (register) an account on the site which will give them access to creating/editing personalized lists of favorites.
* Registered users can add movies to their own lists from either the search results page or the movie detail page.
* Users can edit the order of their movies in their list, but not other users' lists.
* Movie detail page shows a short description taken from a 3rd party API and has a trailer available to see.
* Movie trivia game with multiple-choice answers.

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

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [y] Wire-frame diagrams
* [ ] API documentation
* [ ] Project is deployed to ______Render.com/GitLab-pages______
* [ ] Journals

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:
  
  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME


### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
