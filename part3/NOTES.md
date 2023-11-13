USEFUL NPM PACKAGES

dotenv - using env variables
morgan - logger  (see how to use tokens and build a logger string - look in phonebook folder)
express Json - json body parser implemented in express
cors - implement cors in express app

mongoose - ODM for MONGODB
important things to remember:
  new moongose.Schema to create new schema with mongoDb data types
  use set method to set schema options (see how to configure ToJSON method)
  export a schema with moongose.model('SCHEMANAME', ACTUALSCHEMADEFINED)


remember to setup a middlewar for not found routes (secodn last route in the index file)
rembmer to setup a general error handling middleware (last middleware)

remember to gitignore/dockerignore all the sensibile data (eg. strings in env files)

