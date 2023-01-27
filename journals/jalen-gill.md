# January 4th 2023:
Today was the first day of working on this project, and I was ready to get started with our idea. I didn't have much FastAPI experience yet, so the group decided to spend the day reviewing the videos on learn in order to learn more about FastAPI and be ready to start the project tomorrow.

# January 5th 2023:
It was our first day of committing code to the project. Our group split off into two different groups that worked on different features. I was paired with Brooke and she was the one coding while I was the one guiding her. We managed to set up some routes for users, which would allow us to start working on autherization later.

# January 6th 2023:
We had all learned about authorization during lecture today, so we decided as a group to work on it together to make sure everything related to autherization worked properly. After some time and a few bugs, we managed to get the feature working, meaning that we could be ready to utilize it in the front end when the time comes.

# January 9th 2023:
After getting authorization in the back end to work, we all decided to split up features on the front end to start working on. I chose to implement the search feature where we would make api calls to the OMDB API to get movie data for the user to look through. I got through a little bit of it, and managed to get movie titles to show up by the end of the day.

# January 10th 2023:
I continued to work on the search feature today, I realized that when you entered a query, it would only fetch the first 10 results, which would not be good for queries with hundreds of results. I decided to try to implement next page and previous page buttons. I managed to get them to work somewhat but there was a bug that was causing the buttons to sometimes do the opposite of what they were supposed to do.

# January 11th 2023:
I wanted to fix the next page and previous page buttons today, I solved that previous bug by making sure that the pagenumber had a state that oculd be updated and that it was hardcoded to send the user to page 1 whenever they submitted a query. With that out of the way, I turned my attention to adding bootstrap to make the search results more presentable.

# January 12th 2023:
Now that the search page was functional, I worked towards getting the results to show up in a grid. Since there were 20 results, I made 5 rows of 4 movies, each with a picture and a title. We had also planned to create detail pages for each movie, so I added a button under each result that would redirect them to this page.

# January 13th 2023:
Today I showed off my basic search results page to the rest of the group. Jesse found a better api that had access to more information and higher resolution pictures, so we decided as a group that we were going to switch over from OMDB to the Movie Database API. I took on the responsibility of converting to the newer API. Luckily, I was able to salvage most of my existing code in order to get it to work and had better images by the end of the day.

# January 17th 2023:
Jesse and Mike both contributed code to handle front-end authorization, and it seemed to work for the most part. I wanted to see how I could potentially get the navbar to display different options depending on wheter the user was logged in or not. I just checked whether the user context had a toke inside of it, and if it did, it would show logged in options. It was great to see authorization coming together within our project.

# January 18th 2023:
There was a pretty big problem with the navbar when it came to checking the authorization of the user. For some reason, it was not changing properly when we would log out, it would just stay the same. I fixed this by having it check the token in localstorage rather than user context, and it seems to work for now. There were a lot of issues with this navbar, and I doubt it'll be the last of it.

# January 19th 2023:
I took some time to make the search page look nicer, as well as edit some css on the detail page to get the movie image and description cenetered properly. I replaced the view details button with a modal that allowed you to see some details before going to the details page. There was also an add to list button there to add the movie to one of your lists efficiently.

# January 20th 2023:
I turned my attention to the home page today. Jesse left a placeholder video for the homepage, but our idea was to have multiple videos of different movies show up. I did this by adding another request in the backend to the 3rd party API to retrieve a set of movies with trailers. This was pretty involved, as I made to add trailer API data to the movie API data in order to have everything connected. I managed to get 5 distinct movie trailers on the homepage.

# January 23rd 2023:
Jesse found this react library called react-swiper that could create draggable slides of any elements we wanted. We used this on the homepage to show movie backdrops based on the trailers that were currently being played. I also decided to use this logic on the search page to create swipable results for search queries.

# January 24th 2023:
After doing some digging, I realized that our authentication had been broken from the very start. It was never actually making successful requests to log the user out, which meant that the token would persist in the browser even if the user wasn't logged in. It also meant that the user was still technically authenticated despite logging out and could make requests to our api. I fixed this swiftly in order to sync up authentication on both the front and back end.

# January 25th 2023:
I wanted to adjust the search results to make them show up in a grid, and doing this required reading a bunch of documentation on react swiper and its related modules, it was a huge pain, but I realized that none of the changes I made were applying correctly because I forgot to refresh, which was kind of a bittersweet moment. The grid was working, but the movies were far apart and didn't look that great. I adjusted the width and height of each movie so that it would scale to the page, and this seemed to do the trick.

# January 26th 2023:
I mostly made some edits and bug fixes to both the front and back end of the project. It's getting close to the deadline, so the pressure is starting to build, but I think we as a group did a pretty good job. Our project looks sleek and has tons of complex and awesome features. The last things to do were to adjust the CSS so that the styling of certain sections was not glitchy or off.

# January 27th 2023:
Today was the last day of the project. I was in charge of cleaning up all of the existing code whilst my groupmates worked on documentation/final edits. There was a lot of trouble getting all of the linter tests for both front and back end, but I managed to get it done successfully. I pushed these final changes to main to make sure everyones code passed all of the gitlab CI tests, and they all passed successfully. The last thing to do was finish up my journals and then get ready for deployment after submitting the project.
