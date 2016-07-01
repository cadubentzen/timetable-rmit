var rawTimetableOptions = require('../sts-handler/raw-timetable-options.js');
var timetableSolver = require('../timetable-solver.js');
var calendarToTimetable = require('../calendar-to-timetable.js');

var courses = [ { "school": "115H", "course": "147520" },
  { "school": "115H", "course": "157708" },
  { "school": "125H", "course": "147993" },
  { "school": "115H", "course": "160867" } ];

var processCalendars = (calendars) => {
  //console.log(calendars[0]);
  console.log(calendarToTimetable(calendars[0]));
}

var processRawOptions = (options) => {
  timetableSolver(options,processCalendars);
}


rawTimetableOptions(courses,processRawOptions);
