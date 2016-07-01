var schoolsResolver = require('../sts-handler/schools-resolver.js');

var schoolsCB = (schools) => {
  console.log(schools);
}

schoolsResolver(schoolsCB);
