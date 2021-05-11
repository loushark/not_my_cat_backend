# Not My Cat ✧/ᐠ-ꞈ-ᐟ\

## implementation of the Express.js server

- `npm init`
- npm install dependancies
  - [x] `dotenv` for accessing enviroment data needed to connect to Mongodb
  - [x] `express` for the router functions
  - [x] `mongoose` for connecting and carrying out actions on Mongodb
  - [x] `supertest` for testing requests to the router
  - [x] `jest` as a testing framework, coverage and more
  - [x] `nodemon` to rolling restart the server on saved changes
  - [x] `eslint` as a linter
  
- updated scripts in the package.json
```json
"scripts": {
    "dev": "nodemon app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage --colors"
  }
```

- added dirs: 
  - [x] models
  - [x] config
  - [x] routes/api
  - [x] test/helper
  
- touch:
  - [x] `./app.js`
  - [x] `./test/app.test.js`
  - [x] `./test/users.test.js`
  - [x] `./config/db.js`
  - [x] `./.env`
  - [x] `./routes/api/users.js`
  - [x] `./models/user.js`
  
- added jest configuration to package.json
```json
"jest": {
    "testEnvironment": "node",
    "testTimeout": 10000
  }
```
### app.js

- `app.js` is updated to pull in express.js and a few of the other dependancies and the empty routes files, a test is written for a basic route and then the route added to pass. 
- A port is assigned to the server.
- Middleware is added to the `app.js` to ensure that `json` can be parsed for post requests. (**This has to be declared before any of the routes otherwise it will lead to errors where no body is passed to the post routes.**)
- The db connection method is delcared for dev and production envs.

### users.test.js

- Requires `app`, `testSetup` and `supertest` to be pulled in.
- The tests are in a familiar format in `jest` to `jasmine` and `rspec` et al. 
- The `request` const, instantisation of supertest allows you to make requests to the server from the test suite. 
- Tests involving requests must be async or use the done callback.

### model/user.js

- A `mongoose` schema object that defines the user model in our case. the mongoose documentation helps with how we can define our attributes.

### config/db.js

- Using `mongoose` to create functions to connect to and disconnect from the database. 
- We use the env variable `MONGO_URI` which we access using `dotenv` to connect to the database and make sure that our credentials are not pushed to github.
