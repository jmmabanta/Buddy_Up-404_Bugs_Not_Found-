const express = require("express");
const ical = require("ical");
const { User } = require("../models.js");
const router = express.Router();
const { getUserData } = require("../util.js");

/**
 * getCourses
 * @param scheduleData The ICS file text data
 * @returns An array of courses and their sections.
 */
const getCourses = (scheduleData) => {
  const courses = [];
  for (let entry in scheduleData) {
    const course = scheduleData[entry];
    if (course.hasOwnProperty("summary")) {
      if (courses.indexOf(course.summary) === -1) courses.push(course.summary);
    }
  }
  return courses.map((course) => {
    // Split course info into its name, type (LEC, LAB, ...), and section
    const courseInfo = course.split(" ");
    return {
      name: courseInfo.slice(0, 2).join(" "),
      type: courseInfo[2],
      section: courseInfo[3],
    };
  });
};

const updateUserData = async (googleID, newData) => {
  const user = await User.findOne({ googleID: googleID });
  user.faculty = newData.faculty;
  user.courses = newData.courses;
  await user.save().then((savedUser) => savedUser);
};

router.post("/upload", async (req, res) => {
    const file = req.files.schedule;
    const token = req.get("Authorization");
    const userData = await getUserData(token);
    const scheduleData = ical.parseICS(file.data.toString("utf8"));
    const newData = {
	faculty: req.body.faculty,
	courses: getCourses(scheduleData),
    };
    updateUserData(userData["sub"], newData)
    res.json(newData);
});

module.exports = router;
