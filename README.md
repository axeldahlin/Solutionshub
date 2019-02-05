# Solutionshub - Project 3 at Ironhack bootcamp

## Introduction 

A website where Ironhack students can browse, upvote and serach through solutions to exercises given during the bootcamp. 
At the Ironhack bootcamp students submit their exricises by doing a pull request of the starter code of that exercise. All solutions is there for on GitHub, but it is hard to find the best one. This website solves that problem. 

To play with the site go to: https://solutionshub.herokuapp.com/

![alt text](https://raw.githubusercontent.com/axeldahlin/Solutionshub/master/client/public/screenshot3.png "Solutionshub")

![alt text](https://raw.githubusercontent.com/axeldahlin/Solutionshub/master/client/public/screenshot1.png "Solutionshub")

![alt text](https://raw.githubusercontent.com/axeldahlin/Solutionshub/master/client/public/screenshot2.png "Solutionshub")
## Setup

If you’d like to view my project in your browser:
```
$ git clone https://github.com/axeldahlin/Solutionshub.git
$ cd Solutionshub/server
$ npm i
$ touch .env

```

Now you have to add the following in the .env file:

```
PORT=5000
MONGODB_URI=mongodb://localhost/Solutionshub
SESSION_SECRET=anyValue
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
FRONTEND_URI=http://localhost:3000
```

Now run:

``` 
$ npm run dev
$ cd ..
$ cd client
$ npm i
$ npm start

```

## Technologies Used
- Node
- MongoDB
- Mongoose
- Express
- React
- Reactstrap
- Passport-github
- GitHub API

## Team Members

This was a group exercise completed by [Axel Dahlin](https://github.com/axeldahlin) and [Anthony Ioimo](https://github.com/aioimo).

