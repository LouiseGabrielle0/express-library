//Another way to do it

// const checkIfUserLoggedIn = (req, res, next) => {
//     if(req.session.currentUser){
//         // user is logged in :) 
//         next();
//     }else {
//         //user not logged in....
//         res.send("it's not your lucky day my fren")
//     }
//     }
  

    const isLoggedIn = (req, res, next) => {
        if (!req.session.currentUser) {
            return res.redirect('/login'); //if user not logged in, redirect to "/login"
        }
        next();
    };
    
    module.exports = isLoggedIn;