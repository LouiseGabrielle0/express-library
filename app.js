// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

require('./config/session.config')(app); //this must be after const app = express() as we need the express application

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "library-project";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


// this function allows us to use data accross the whole app - it runs everytime to check for changes. For every request - this function gets exceuted. 
app.use((req, res, next) => {
    res.locals.session = req.session // allow access to session data from layout.hbs
    next() // this line keeps the flow moving so it doesn't get stuck on this function
})

const isLoggedIn = require("./middleware/route-guard")

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes )


//can also be done like this --- same thing less lines
app.use("/",require("./routes/author.routes"))

app.use("/books", isLoggedIn, require("./routes/book.routes"))


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
