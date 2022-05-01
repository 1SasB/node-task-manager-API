# Task Manager REST API
REST API Built With Node.js, Express and MongoDB

# Get Started
To get this node server running locally on your computer:
* Clone this repository:
```
git clone https://github.com/1SasB/node-task-manager-API.git
```
* Install dependancies:
```
npm install
```
* Start Server
```
npm run dev
```
## Prerequisites
You need git to clone this project. You can get it from [http://git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed. 
You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json.

This project uses MongoDB. Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`

## Project structure
- `src/index.js` - This is the entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `src/middleware` - This folder contains `authentication.js` within it, you can find code for handling authentication middleware 
- `src/models` - This folder contains two js files,`task.js` and `user.js`. These files contain the scheama definitions for our models
- `src/routes` - This folder contains two js files,`task.js` and `user.js`. Within these files, you can find all the route definitions for our API.
- `src/db` - This folder containse `mongoose.js` within which you can find the code used to connect our application to mongodb db.
```sh
.
├── package.json
├── src
│   ├── db
│       └── mongoose.js
│   ├── middleware
│       └── authentication.js
│   ├── models
│       ├── task.js
│       └── user.js
│   ├── routers
│       ├── task.js
│       └── user.js
│   └── index.js

```
