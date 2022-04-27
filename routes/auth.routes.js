const User = require("../models/User.model");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

//render register form
router.get("/register", (req, res, next) => {
    res.render("auth/register");
})


//process register form - generate SALT and HASH
router.post("/register", (req, res, next) => {
    
    const {email, password} = req.body //ES6 object destructuring

    if(!email || !password){
        res.render("auth/register", {errorMessage: "Please provide email and password"})
        return
    }

    bcryptjs
    .genSalt(saltRounds)
    .then( salt => {
      return bcryptjs.hash(password, salt)
    })
    .then( hashedPassword => {
        console.log("hashedPassword", hashedPassword);
        const userDetails = {
            email: email,
            passwordHash: hashedPassword
        }
        return User.create(userDetails)
    })
    .then( user => {

        res.send("user was created :)")
    })
   
    .catch(err => {console.log("error creating account", err)
    next(err);})
})


module.exports = router;