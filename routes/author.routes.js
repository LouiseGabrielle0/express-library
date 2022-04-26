const Author = require("../models/Author.model");
const router = require("express").Router();


//Display all authors - READ
router.get("/authors", (req, res, next) => {
    Author.find()
      .then((authorArray) => {
        res.render("authors/authors-list", { author: authorArray });
      })
      .catch((err) =>
        console.log("A error occured while searching for authors on the db", err)
      );
  });
  
  // Render a form to CREATE new author
  router.get("/authors/new", (req, res, next) => {
    res
      .render("authors/new-author")
  
      .catch((err) =>
        console.log("A error occured while looking for the author", err)
      );
  });

    // CREATE new Author - process the form
router.post("/author/create", (req, res, next) => {
    console.log(req.body);
  
    const newAuthor = {
      title: req.body.title,
      favouriteBook: req.body.favouriteBook,
      country: req.body.country,
    };
  
    Author.create(newAuthor)
      .then((newAuthor) => {
        res.redirect("authors/authors");
        console.log("A new author was created", newAuthor);
      })
      .catch((err) => console.log("There was an error creating a new author", err));
  });

  
// Edit individual author details - render form - UPDATE
router.get("/author/:authorId/edit", (req, res, next) => {
    const id = req.params.authorId;
  
    Author.findById(id)
      .then((authorDetails) => {
          console.log("found the author", authorDetails);
        res.render("authors/update-author", authorDetails);
      })
      .catch((err) =>
        console.log("There was an error fetching the author to be edited", err)
      );
  });

  // Edit individual author details - proccess from - UPDATE
router.post("/authors/:authorId/edit", (req, res, next) => {
    const id = req.params.authorId;
  
    const updateAuthor = {
        title: req.body.title,
        favouriteBook: req.body.favouriteBook,
        country: req.body.country,
      };
    Author.findByIdAndUpdate(id, updateAuthor)
      .then((updatedAuthor) => {
        res.redirect(`authors/authors`);
      })
      .catch((err) => console.log("There was an error updating a author", err));
  });
  




  module.exports = router;