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
