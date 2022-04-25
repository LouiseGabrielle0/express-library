// models/Book.model.js
 
const { Schema, model } = require('mongoose');
 
const bookSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 5,
    },
    author: String,
    rating: Number
  },
  {
    timestamps: true
  }
);

const Book = model('Book', bookSchema);
 
module.exports = Book;