const Book = require("../models/Book.model");

const router = require("express").Router();


router.get('/book', (req, res, next) => {
    Book.find()
    .then((booksArray) => {
       console.log("these books were found", booksArray);
        res.render("books-list", {books: booksArray});
    })
    .catch(err => console.log("A error occuried searching for books on db" ,err))
});

router.get('/book/:bookId', (req, res, next) =>{
    const id = req.params.bookId

    Book.findById(id)
    .then((bookDetails) => {
        console.log("this book has been searched");
        res.render("individual-book", bookDetails)
    })
})

module.exports = router;