# QuickEats

## Make sure you have Node >= 8.10 and npm >= 5.6 on your machine ##

1. Run "git clone https://github.com/Colin797/QuickEats.git" to clone the repo

2. Navigate to QuickEats/quickeats/

3. Run "npm install" for dependencies

4. Run "npm start" to start the application

5. Open http://localhost:3000 to view it in the browser.

## Core Algorithm (View vsm.js) ##

We implemented the VSM ranking algorithm located in vsm.js.
Currently the user query is located in vsm.js on line 10 as "userQuery".
The userQuery is an array of strings, modify this to change the query.

Note: We will provide 3 sample queries

The userQuery is a list of ingredients the users wants to use.
The ranking algorithm returns the best 3 ranked recipes.

The output contains:
  1. Rank
  2. Recipe Title
  3. Key (in Json)
  4. Score - recipe score value
    Note: Score is determined by ingredient relevance and preperation time
  5. Time - estimated time to prepare in minutes
