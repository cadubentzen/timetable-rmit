var coursesResolver = require('../sts-handler/courses-resolver.js');

var school = "125H"; // Computer Science School

var coursesCB = (school,courses) => {
  console.log(courses);
}

coursesResolver(school,coursesCB);
