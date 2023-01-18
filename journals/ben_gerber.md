# 1-5-23

Started working on back-end, routes and queries for movies
Worked with Jesse and Mike, Jesse was the driver and Mike and I were the navigators
Had trouble getting connection to the database with proper username and password, was resolved by delting the volume and rebuilding the container

# 1-6-23

Finished CRUD for the movie_groups
Had some challenges where some things were dictionaries and others were custom objects, there still seem to be a mix of both but a mix that works

# 1-9-23

Created a front end view for the movie groups with a page for a list of movie groups and a page with a form to add a new movie group

# 1-10-23

Updated the list view for movie groups so that the user can add a new group on the list page instead of a seperate page and got rid of the seperate form page.
Also added delete and edit buttons to the list

# 1-11-23

The list view wasn't actually working properly, I did not test it thoroughly enough. I fixed those problems today.

# 1-12-23

Today I worked on the "Add to list" button functionality on the MovieDetail.js page. I've gotten the basics to work, but I need to add a way to check if a movie is already in a group.
I also need to make it so the user can choose which group to add it to.

# 1-13-23

I was able create the functionality for a user to choose which list to add a movie to and for a movie to not be added to a list
where it already exists from the movie detail page. I'm still working on adding that to the modal in the movie search page.
The only difficulty I have had with it is that the modal closes whenever you click anywhere, so opening the dropdown closes the modal

# 1-17-23

Fixed the modal closing when clicked, but that meant there was no longer a fade effect. I realize as I'm writing this at 5:40 PM EST that I forgot to mention this... Hopefully I will remember to breing it up tomorrow...
finished the add to list buttons, but ran into issues with authentication when pulling from main. Fixed that by getting the auth token from UserContext and sending it as authorization in the headers where needed.
Also Mike let me know that I did not put in any filter to the add buttons so that the logged in user can only add to their lists, luckily it was a quick(ish) fix as there was already a query for movie groups by user
Also quickly wrote a test for movie_groups, should push that up to main.
Tomorrow I'd like to work on it showing the username in the "All Favorites" page instead of just the user id, but the only info on the user available so far in that file is the user id.
I may have to make a query that returns a user based on a user id as the only one we have now like that returns based on a user id.

# 1-18-23

Noticed the delete button on the movie group detail page wasn't working so I fixed that. That got mostly overwritten though. The way the movie group detail was get the movies in the group was very ineffecient because I coded it terribly the first time for some reason to make fetches for every movie... but I fixed that by adding a new query and route that takes a string of numbers seperated by commas which returns all the movies with the id included in that string of numbers.
On a less dev more personal note, I feel any contribution I've made has been poor and been overwritten eventually (and rightly so). Still, it sucks to see when you write something then it just gets replaced and called shit to your face.
Not that it wasn't deserved.
