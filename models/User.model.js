const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, //always convert to lowercase
      trim: true, // removes whitespace from the begining and end of the string
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,  // this object adds extra properties: `createdAt` and `updatedAt`
  }
);

const User = model("User", userSchema);

module.exports = User;
