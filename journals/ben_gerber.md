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

# 1-19-23

Not really sure what to do today. It seems MVP is done and we're on sretch goals now. Not sure if deployment should come before or after that but they've already started on other stuff so that's kind of a moot point.
Nothing is left that isn't being worked on by multiple people in what we put for stretch goals aside from the trivia game which I'm not sure I can do. Besides, I doubt they want me to go ahead and do that on my own,
they'd probably have to redo most of my code as they already have. Not sure if all these journal entries are going to be read, but I wonder if I'm doing/have done enough to be reviewed well by my peers. I may fail based just on that.
I feel personally that I've done a fair amount, but I wouldn't take it personally if they reviewed me poorly. Three members of the group have seemed to have done most of the work, I've just tried to do what I can.

# 1-20-23

I decided to just go for the trivia page and it was a lot easier then I expected, got a lot of it done in less than a day. I started out with the page just sending alerts if a question was right or wrong and, after a lot of troubleshooting, I learned that alert is a `blocking function` which halts the execution of code so I moved them to console.logs.

It wasn't as easy to see right away but it worked and didn't mess up everything. The alerts made me think states weren't updating correctly because if you answered the last question correctly it would not update the state for score before showing you your final score via the alert. Getting rid of the alerts and putting the neccessary functions in the setScore function made everything work as it should.

Getting the questions and answer choices displayed was fairly straight forward, using a state to keep track of the index of the current question in the questions list was definitely helpful. Something I try to use all the time now that I tried here is something I learned from a friend a few days ago called `destructuring assignment`. For example I was able to do

```
const { results } = await response.json();
```

instead of

```
const data = await response.json();
const results = data.results;
```

Once I got modals set up to display if the user got the question right or wrong, I needed to handle what happened when the game ended. For a while the user could just close the modal and click answer to the last question again and again to increase their score, but using ternary with the gameOver hook I already had made it possible to hide the question once the game was over. Then I added play again buttons to the game over modal and the page behind it which just refreshes the page to get new questions and resets the score.

Right now the trivia only does 3 questions, I'd like to let the user choose how many questions they want or possibly put an "endless" mode where users can keep answering questions until they get a set amount wrong (between 1-3, not sure yet). Perhaps the "home" page of the trivia can be a select screen for modes (set amount/endless) and the user can choose from there.

The idea of a leaderboard for users has been brought up a few times, I love the idea but I'm not sure how to do it. I may let someone else work on that part or possibly I could "drive" while someone else "navigates" for that (or vice versa, I'm not sure which would be better).

It's towards the end of the day now though so I'll probably wait until Monday to implement any of those features unless anybody really wants to get started over the weekend but I doubt it (or at least I hope not).

Just so I don't forget I'll list them here:

> Trivia homepage with two selections
> "Endless" mode
> Let users select number of questions
> User leaderboard

# 1-23-23

Was able to successfully break down the trivia into the modes, just need to find a way to get more questions once the initial 50 are used and make sure that questions aren't repeated. (I forgot to write this journal the day of so I forgot a lot of what happened)

# 1-24-23

Found a way to get new questions without repeating by keeping track of the old questions and filtering new ones against it. The only thing is this doesn't work in strict mode, but that should be disabled once deployed anyway, it seems to work perfectly once that's disabled (I actually might need to double check this, will do that tomorrow). The answers were also randomly sorting twice, once when they were loaded and once when the modal was closed. Moving the sort logic into the fetchQuestions function solved that. Was able to organize the buttons for the modes a bit better as well as the input for how many questions for the limited mode. It still doesn't look very nice, but it's a bit more functional. I want to add the ability for the user to choose a difficulty since the api can filter by that. We've got three more days but there are other things to worry about at the end I'm sure but I'll see what I can do. Worst case scenario I can do it as a stretch goal.

# 1-25-23

Realized I only made the change to prevent the double sorting of answers into one of the game modes, now it's added to the other. Pushed trivia game to main, with all the deployment stuff to worry about I'm not sure if there will be time before Friday to add the difficulty setting stuff. To do that I may need to create new routes for each difficulty if it's something I want to pass through the URL as a parameter like `trivia/endless/medium` or `trivia/limited/10/medium`. If I can find a different way to do it it might be easier.
