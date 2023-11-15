USEFUL NPM PACKAGES

dotenv - using env variables
morgan - logger  (see how to use tokens and build a logger string - look in phonebook folder)
express Json - json body parser implemented in express
cors - implement cors in express app
nodemon --hot reload
express-async-errors -- elimites try catch for async await operations (it will forward error to error handler directly)
Jest - testing
supertest - package for testing HTTP requests
mongoose - ODM for MONGODB
bcrypt - passowrd hashing
jswonwebtoken

--

important things to remember:
  new moongose.Schema to create new schema with mongoDb data types
  use set method to set schema options (see how to configure ToJSON method)
  export a schema with moongose.model('SCHEMANAME', ACTUALSCHEMADEFINED)


remember to setup a middlewar for not found routes (secodn last route in the index file)
rembmer to setup a general error handling middleware (last middleware)

remember to gitignore/dockerignore all the sensibile data (eg. strings in env files)

--

TESTING:

When testing include all tests in tests folder. a file must have .test notation by convention.
inside test file require:
moongoose
supertest
app
needed moongose models

use a NODE_ENV env variable to peform dinamyc assigments depending on the launched enviroment (eg using a dev or test DB)

supertest will take take of forwarding requests to correct port.
wrap app reference to a supertest function call and assign to a variable (eg api)

use a beforeeach function to make preliminary operation before each test (like removing and readding data to the DB)
write tests as usual
use an after all function to close mongodb connection

ensure to include a globalteardown in the jest section of package.json with the relative file.
the above is needed to remove complains of moongose when using jest (see teardown.js)

