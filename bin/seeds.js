// bin/seeds.js

const mongoose = require('mongoose');
const Author = require('../models/Author.model');
const Book = require('../models/Book.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/library-project';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// PASTE HERE THE LIST OF BOOKS PROVIDED IN THIS GIST: https://gist.github.com/ironhack-edu/2816267a015d4870f95275cb873d33b6


const authors = [
  {title: "Suzanne Collins",
favouriteBook: "All the food",
country:"USA",},
{title: "J.K. Rowling",
favouriteBook: "The Witces",
country:"UK",},
{title: "Harper Lee",
favouriteBook: "The great harp",
country:"USA",},
{title: "Markus Zusak",
favouriteBook: "The Wizard of Oz",
country:"Syndey",},
];


const books = [
    {
      title: "The Hunger Games",
      description:
        "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation. The Hunger Games is an annual event in which one boy and one girl aged 12–18 from each of the twelve districts surrounding the Capitol are selected by lottery to compete in a televised battle royale to the death.",
      rating: 10
    },
    {
      title: "Harry Potter",
      description:
        "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).",
      rating: 9
    },
    {
      title: "To Kill a Mockingbird",
      description:
        "To Kill a Mockingbird takes place in the fictional town of Maycomb, Alabama, during the Great Depression. The protagonist is Jean Louise (“Scout”) Finch, an intelligent though unconventional girl who ages from six to nine years old during the course of the novel. She is raised with her brother, Jeremy Atticus (“Jem”), by their widowed father, Atticus Finch. He is a prominent lawyer who encourages his children to be empathetic and just. He notably tells them that it is “a sin to kill a mockingbird,” alluding to the fact that the birds are innocent and harmless.",
      rating: 8
    },
    {
      title: "The Book Thief",
      description:
        "The Book Thief tells the story of Liesel, a little girl who is taken to a new home because her mother can't afford to take care of her. The story is told by Death, who becomes a character you come to respect and even feel sorry for by the end. The narration puts an odd perspective on the story. Much of what Death says is very philosophical, and even beautiful.",
      rating: 7
    },
  ];

Author.create(authors)
.then(authorFromDB => {
  console.log(`created ${authorFromDB.length} authors`)
  return Book.create(books)
})
  .then(booksFromDB => {
    console.log(`Created ${booksFromDB.length} books`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`Error errror error error occurred while seeding data from the DB: ${err}`));
