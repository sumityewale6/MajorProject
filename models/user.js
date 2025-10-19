const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const { schema } = require("./review");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Add username, hash, salt, and built-in auth methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
