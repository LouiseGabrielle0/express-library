// models/Book.model.js
 
const { default: mongoose } = require('mongoose');
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
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Author",
    },
    rating: Number
  },
  {
    timestamps: true
  }
);

const Book = model('Book', bookSchema);
 
module.exports = Book;