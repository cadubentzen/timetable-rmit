var coursetimetableResolver = require('./coursetimetable-resolver.js');

module.exports = (courses,callback) => {
  var options = [];
  var i = 0;
  var ncourses = courses.length;

  var processTimetable = (school,course,timetable) => {
    for(var key in timetable) {
      options.push(timetable[key]);
    }
    if(++i == ncourses) callback(options);
  }

  courses.forEach((course) => {
    coursetimetableResolver(course.school,course.course,processTimetable);
  });
};
