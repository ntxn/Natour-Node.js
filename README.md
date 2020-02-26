A dynamic web application built to learn and experience server side web development using Node.js, Express, MongoDB

- DEVELOPMENT PROCESS
    - Using Express for routing and making Http requests
        - Step 1: Create simple APIs (updating local files for now) using RESTful architecture ==> CRUD Operations created
        - Step 2: Having more resources like tours, users, etc, it's better to create routers and mount these routers to the respective resources.
        - Step 3: Refactoring the app.js into seperate components and apply MVC framework

        |-- server                  # To start the server
        |-- app                     # express app
        |-- routes                  # endpoints
            |-- tourRoutes
            |-- userRoutes
        |-- controllers             # C in MVC: control the request from endpoints to data in local files (for now)
            |-- tourController
            |-- userController
            - Step 4: Set up a public route as a root folder to serve static files by `app.use(express.static(${__dirname}/public`));

    - Set up Environment Variables in `config.js` to configure the environment is devlopment/production, etc. Then link this file to the application by using the npm package called `dotenv`

    - MONGODB
        - Create a DB on MongoDB Atlas, connect it to MongoDB Compass on desktop
        - Connect the MongoDB Atlas DB to Express App using Mongoose:
            Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
        - Mongoose:
            - Create schema --> create a model based on that schema --> create new document based on that model --> call .save() method to save it to DB
    
    - Refactor the app structure using USE MVC model <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/4175fe7063f0334a0f5ef57fa21793a479cbd482">#4175fe7</a>
        - <img src="dev-process/dev-images/mvc_without_v.png" width="650">

        - Removed <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/5516fa79474cf1df628bdfeb5cfc8c9ea021aad8">Param Middleware</a> in `tourController` & `tourRoutes`


        |-- server                  # To start the server, connect to mongoDB DB
        |-- app                     # express app
        |-- routes                  # endpoints
            |-- tourRoutes
            |-- userRoutes
        |-- controllers
            |-- tourController
            |-- userController
        |-- models
            |-- tourModel

    - MONGOOSE
        - <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/2ec1b7fc057f28ea6b54abefe14510d8cadd6316">2ec1b7f</a>
            - Update CRUD operations on tours. The `tourController` makes changes to the tourModel (which will then update the tours collection in natours db on Atlas) instead of text files using `fs.readFiles()` or `fs.writeFiles()`
            - Add more data to the tour schema. Wrote script to import data from `tours-simple.json` to database

        - API endpoints with advanced features <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/dcd884fc3ec9d15a1accd9d3691cbd1c9616b85e">dcd884f</a>
            - Filter the result with price = 397 and duration >= 5 and difficulty = ease
            - Sorting 
            - Limiting Fields
            - Pagination
            - Alias
        
        - Aggregation Pipeline to generate stats: Matching, Grouping, Unwinding, Projecting <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/0e19793f41bc2dedfa2ad80a11ba683e2027615d">0e19793f</a>

        - Use Mongoose Model's Virtual Properties to do business logic in the model. (the data is not persisted, only calculated everytime the data is requested) <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/4141597902668c44266652204791432e003627a0">4141597</a>

        - Mongoose Middleware (Pre & Post hooks) <a href="https://github.com/ngannguyen117/Natour-Node.js/commit/e08495e906e649734842820af4a617cca407079a">e08495e9</a>:
            - Ex: Each time a new doc is saved to the db, a function can be run between the saved command is issued and the actual saving of the doc, or also after the actual saving
            - 4 types: document, query, aggregate, model
            - Document middleware: acts on the currently processed document with `.save()` and `.create()` only
            - Query middleware: allows us to run some function before and after a certain query is executed. Acts on the current query.
            - Aggregation middleware: add hooks before and after an aggregation happens. Points to the current Aggregation object
        
        - Data Validation with Mongoose:
            - Built-in: `required` can be used for all data types, `maxlength`, `minlength`, enum only for strings, `max` & `min` for Number, Date
            - Custom:
                - Writing your own by adding `validate: callback function` to the type option of a field. NOTE: `this` only works when we create NEW doc, won't work with `update`.
                - Use a library called <a href="https://github.com/validatorjs/validator.js">`validator`</a> as custom validator. Ex: `validate: [validator.isAlpha, 'Tour name must only contain characters']`
