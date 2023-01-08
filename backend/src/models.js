const mongoose = require("mongoose");
mongoose.connect("mongodb://db:27017/users");

const findOrCreate = require("mongoose-findorcreate");
const UserSchema = new mongoose.Schema({
  googleID: String,
  name: String,
  email: String,
  picture: String,
  faculty: String,
  courses: [{ name: String, type: String, section: String }],
});
UserSchema.plugin(findOrCreate);
const User = new mongoose.model("User", UserSchema);

module.exports = { User };
