const mongoose = require("mongoose");
mongoose.connect("mongodb://db:27017/users");

const findOrCreate = require("mongoose-findorcreate");
const CourseSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    section: String,
  },
  { _id: false }
);
const UserSchema = new mongoose.Schema({
  googleID: String,
  name: String,
  email: String,
  picture: String,
  faculty: String,
  courses: [CourseSchema],
});
UserSchema.plugin(findOrCreate);
const User = new mongoose.model("User", UserSchema);

module.exports = { User };
