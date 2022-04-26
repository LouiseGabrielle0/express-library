const Book = require("../models/Book.model");

const router = require("express").Router();


// Display all books - READ
router.get('/books', (req, res, next) => {
    Book.find()
    .then((booksArray) => {
       console.log("these books were found", booksArray);
        res.render("books-list", {books: booksArray});
    })
    .catch(err => console.log("A error occuried searching for books on db" ,err))
});


// Render a form to CREATE new book
router.get('/books/new', (req, res, next) => {
    res.render("new-book")
})

// CREATE new book - process the form
router.post('/books/create', (req, res, next) =>{
    console.log(req.body)
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
    }
    Book.create(newBook)
    .then(newBook => {
        res.redirect("/books")
        console.log("A new book was created", newBook)
    })
    .catch(err =>console.log("There was an error creating a new book", err))
})


// Display individual book details - READ
router.get('/books/:bookId', (req, res, next) =>{
    const id = req.params.bookId

    Book.findById(id)
    .then((bookDetails) => {
        console.log("this book has been searched");
        res.render("individual-book", bookDetails)
    })
})

// Edit individual book details - render form - UPDATE
router.get('/books/:bookId/edit', (req, res, next) =>{
    const id = req.params.bookId

    Book.findById(id)
    .then((bookDetails) => {
        res.render("edit-book", bookDetails)
    })
    .catch(err => console.log("There was an error fetching the book to be edited", err))
});

// Edit individual book details - proccess from - UPDATE
router.post('/books/:bookId/edit', (req, res, next) =>{

    const id = req.params.bookId

    const updateBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
    }
    Book.findByIdAndUpdate(id, updateBook)
    .then((updatedBook) => {
        res.redirect(`/books/${updatedBook._id}`)
    })
    .catch(err =>console.log("There was an error updating a book", err))
})


// Delete a book  from
router.post('/books/:bookId/delete', (req, res, next) => {
    const id = req.params.bookId
    Book.findByIdAndRemove(id)
    .then(() =>
    res.redirect("/books"))
    .catch(err => console.log("There wasan error deleting a book", err)
        )
})


// Filter by rating
router.get('/rating/:rating', (req, res, next) => {
    const rate = req.params.rating
    const bookRating = parseInt(rate)
    console.log("User searched by rating", bookRating)
    Book.find({rating: {$gt :bookRating}})
    .then((booksByRatingArray) => {
       console.log("these books were found", booksByRatingArray);
        res.render("books-filtered", {booksRating: booksByRatingArray});
    })
    .catch(err => console.log("A error occuried returning books by rating" ,err))
});




module.exports = router;