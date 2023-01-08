const express = require("express");
const router = express.Router();
const { User } = require("../models.js");
const { getUserData } = require("../util.js");

const getCoursesAndFaculty = async (googleID) => {
  const user = await User.findOne({ googleID: googleID });
  return {
    faculty: user.faculty,
    courses: user.courses,
  };
};

const findUserSameCourse = async (course) => {
  const users = await User.find({ courses: course });
  return users;
};

const findUserSameFaculty = async (faculty) => {
  const users = await User.find({ faculty: faculty });
  return users;
};

router.get("/", async (req, res) => {
  const userData = await getUserData(req.get("Authorization"));
  const { faculty, courses } = await getCoursesAndFaculty(userData["sub"]);
  const matchedUsers = {};
  for (let c in courses) {
    const users = await findUserSameCourse(courses[c]);
    for (let u in users) {
      const matchedUser = users[u];
      if (matchedUser.googleID != userData["sub"]) {
        if (matchedUser.googleID in matchedUsers) {
          matchedUsers[matchedUser.googleID].count++;
        } else {
          matchedUsers[matchedUser.googleID] = {
            name: matchedUser.name,
            email: matchedUser.email,
            picture: matchedUser.picture,
            count: 1,
          };
        }
      }
    }
  }
  const sameFacultyUsers = await findUserSameFaculty(faculty);
  for (let u in sameFacultyUsers) {
    const matchedUser = sameFacultyUsers[u];
    if (matchedUser.googleID != userData["sub"]) {
      if (matchedUser.googleID in matchedUsers) {
        matchedUsers[matchedUser.googleID].count++;
      } else {
        matchedUsers[matchedUser.googleID] = {
          name: matchedUser.name,
          email: matchedUser.email,
          picture: matchedUser.picture,
          count: 1,
        };
      }
    }
  }

  console.log(matchedUsers);
  res.json(matchedUsers);
});

module.exports = router;
