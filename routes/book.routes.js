const Book = require("../models/Book.model");

const router = require("express").Router();


router.get('/books', (req, res, next) => {
    Book.find()
    .then((booksArray) => {
       console.log("these books were found", booksArray);
        res.render("books-list", {books: booksArray});
    })
    .catch(err => console.log("A error occuried searching for books on db" ,err))
});

router.get('/books/new', (req, res, next) => {
    res.render("new-book")
})

router.post('/books/new', (req, res, next) =>{
    console.log(req.body)
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rate: req.body.rating,
    }
    Book.create(newBook)
    .then(newBook => {
        res.redirect("/books")
        console.log("A new book was created", newBook)
    })
    .catch(err =>console.log("There was an error creating a new book", err))
})



router.get('/books/:bookId', (req, res, next) =>{
    const id = req.params.bookId

    Book.findById(id)
    .then((bookDetails) => {
        console.log("this book has been searched");
        res.render("individual-book", bookDetails)
    })
})




module.exports = router;