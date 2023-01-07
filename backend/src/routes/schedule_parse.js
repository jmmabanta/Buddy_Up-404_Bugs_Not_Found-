const express = require("express");
const ical = require("ical");
const router = express.Router();

const getCourses = (scheduleData) => {
  const courses = [];
  for (let entry in scheduleData) {
    const course = scheduleData[entry];
    if (course.hasOwnProperty("summary")) {
      courses.indexOf(course.summary) === -1
        ? courses.push(course.summary)
        : console.log("Course already exists!");
    }
  }
  return courses.map((course) => {
    const courseInfo = course.split(" ");
    return {
      name: courseInfo.slice(0, 2).join(" "),
      type: courseInfo[2],
      section: courseInfo[3],
    };
  });
};

router.post("/upload", (req, res) => {
  const file = req.files.schedule;
  console.log(file);
  const scheduleData = ical.parseICS(file.data.toString("utf8"));
  res.send(getCourses(scheduleData));
});

module.exports = router;
