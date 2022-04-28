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
    .then( userFromDB => {

      //  res.send("user was created :)")
        res.redirect("/login")
    })
   
    .catch(err => {console.log("error creating account", err)
    next(err);})
})

//LOGIN: display form
router.get("/login", (req, res, next) => {
    res.render("auth/login");
})

//LOGIN: process form
router.post("/login", (req, res, next) => {

    const {email, password} = req.body;

    if( !email || !password){
        res.render("auth/login", {errorMessage: "Please provide email and password"});
        return;
    }

    User.findOne({email: email})
        .then( userFromDB => {
            if( !userFromDB ) {
                //user doesn't exist
                res.render('auth/login', { errorMessage: 'Incorrect credentials (no user with that email address).' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                req.session.currentUser = userFromDB; //storing information for the session
               // res.render('auth/user-profile', {user: userFromDB}); - this is used if no session - which will mean the user won't stay logged in
               // res.render('auth/user-profile', {user: req.session.currentUser}); - renders the profile page with current user and session
                res.redirect("/user-profile")
            } else {
                //login failed (password doesn't match)
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch( error => {
            console.log("Error getting user details from DB", error);
            next(error);
        });
})


//PROFILE PAGE
router.get('/user-profile', (req, res, next) => {

    console.log(req.session);

   // res.render('auth/user-profile');
    res.render('auth/user-profile', {user: req.session.currentUser});
});


//LOGOUT PAGE
router.post('/logout', (req, res, next) =>{
    req.session.destroy(err=> {
        if (err) {
            next(err)
        }
        res.redirect('/')
            })
})

module.exports = router;