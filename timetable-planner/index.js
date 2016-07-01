var schoolsResolver = require('./schools-resolver.js');
var coursesResolver = require('./courses-resolver.js');
var coursetimetableResolver = require('./coursetimetable-resolver.js');
var rawTimetableOptions = require('./raw-timetable-options.js');

var processRawOptions = (options) => {
  console.log(options);
}

var processCourses = (school,courses) => {
  var _courses = [];
  for(var i=0; i<3; i++) {
    _courses.push({
      school: school,
      course: courses[i]
    });
  }
  rawTimetableOptions(_courses,processRawOptions);
};

var processSchools = (schools) => {
  coursesResolver(schools[0],processCourses);
};

schoolsResolver(processSchools);
