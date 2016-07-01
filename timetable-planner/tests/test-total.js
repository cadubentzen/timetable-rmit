var schoolsResolver = require('../sts-handler/schools-resolver.js');
var coursesResolver = require('../sts-handler/courses-resolver.js');

var total = 0;

var coursesCB = (school,courses) => {
  total += courses.length;
  console.log(school+' '+total);
};

var schoolsCB = (schools) => {
  schools.forEach((school) => {
    coursesResolver(school.code,coursesCB);
  })
};

schoolsResolver(schoolsCB);
