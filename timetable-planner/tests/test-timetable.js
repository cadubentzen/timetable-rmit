var rawTimetableOptions = require('../sts-handler/raw-timetable-options.js');

var courses = [
  {
    "school": "140H",
    "course": "154970"
  },
  {
    "school": "140H",
    "course": "155020"
  },
  {
    "school": "125H",
    "course": "153578"
  },
  {
    "school": "125H",
    "course": "150193'"
  }
];

var rawOptionsCB = (options) => {
  console.log(options);
};

rawTimetableOptions(courses,rawOptionsCB);
