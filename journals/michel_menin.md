# 2023-01-05

Worked with Jesse and Ben for CRUD for the movies which will serve as our local database of movie data.  Jesse was the driver.

# 2023-01-06

Identified a potential bug in the account creation process.  It may be isolated to me, but I get bug on both my mac and windows machines.  Will continue to explore.  No one else has this problem.  The user is created successfully but I receive an error response from the server.

# 2023-01-07/08

Wrote out the CRUD list items with reference to movie_group_id (movie list) and movie_id, getting all items in the table, and getting all items belonging to the movie_group (movie list) with INNER JOIN.  Added a property to add sorting capability to the list items, and an update method to change the order of the items.

# 2023-01-09

Removed some test code I had inserted previously.
Fixed a bug with the get-movie-group method that would return an error.  Not clear why the using square brackets for the variables in the sql execute query is necessary vs parentheses (list vs tuple).  Then we had to fix the formatting of the return data to make sure it matches what was expected.

# 2023-01-10

Helped with some code to get the images to show in the results page.

# 2023-01-11

Worked with Jesse on front end for Movie Detail.  Jesse was driver and I was navigator.

# 2023-01-14

Worked on authentication for back-end.  Implemented authentication on 'edit' features (create,edit,delete) so that outsiders cannot modify data, but allow anyone to read data.

# 2023-01-16

Worked on authentication for front-end with Jesse.  Saved token to localStorage and user_id.  Authentication was implemented to allow for requests to pass through as authorized.  We identified a bug, which does not allow to delete movie-groups because of the relationship with the items tied to them.  (this is an 'on delete cascade or protect' issue).  Login/Logout/Signup are functional, but ugly.  Favorites list for user view is functional.

# 2023-01-17

Worked with Jesse on the cascade delete problem for deleting movie-groups, fixed.  Improved the movie-group list view and functionality to edit,create,delete movie groups to your own list.
Fixed a bug that allowed non-owners of movie items to delete movie-items.  Added cancel buttons to the user list view of favorites, so if you wanted to edit or create a new list, you could cancel and the input field disappears.  Fixed some bugs in the process.

# 2023-01-18

Worked with Jesse and Jalen (Jesse driver, Jalen & I nav) to get the list of movies to be draggable to reorder the list of movies in a favorite list (movie-group).  Functional to the point where you can reorder the list on the front end.  Back end had already been set up for this feature.s

# 2023-01-20

Finished editing feature for movie items in Favorite list.  Edit mode will allow you to make changes (reorder and delete) but will not execute any changes to the database until confirmation, a cancel button will revert the changes and reload the data.

Fixed a serious bug in the Favorites list view because the movie_id from the movie database was used instead of the movie_item_id so it would not update or delete correctly.


# 2023-01-23

Fixed bug when not logged in, now redirects to login page if needed, added other navigation buttons, fixed some visual aspects and user controls for list view.  Jalen found a bug with some backend auth stuff I did for creating movie_item.  I had fixed the delete issue but had not tested the create.

# 2023-01-24

Fixed allow showing edit button to correctly show when owner of the list is logged in.

# 2023-01-25

Wrote some unit tests for movie-items.  Made tests testing if a user is unauthenticated, authenticated but unauthorized or authorized is receiving the correct response.
AHA moment:  Making these tests would have let me find the bugs that we accidentally found earlier where the endpoint would allow adding items when in reality the user was not the owner of the list (unauthorized)

# 2023-01-26

Made changes to Mainpage, links, login button disappears.  Styled the movie list tables.

# 2023-01-27

Honestly, on the last day, there were a lot of last-minute merge conflicts and polishing.  I did not interfere too much with the files to avoid said conflicts, I did however poke holes at the app and tested all the functionality I remembered to check.  I don't remember if I had significant code contribution today besides mitigating a 404 response which shows up RED in the console.  As a quick fix (due to time restrictions), I changed the response code from our API and kept the working logic as it was.  Completed some of the data-models docs.
