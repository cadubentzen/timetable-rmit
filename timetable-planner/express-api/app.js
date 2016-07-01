var schoolsResolver = require('../sts-handler/schools-resolver.js');
var coursesResolver = require('../sts-handler/courses-resolver.js');
var coursetimetableResolver = require('../sts-handler/coursetimetable-resolver.js');
var rawTimetableOptions = require('../sts-handler/raw-timetable-options.js');
var timetableSolver = require('../timetable-solver.js');
var calendarToTimetable = require('../calendar-to-timetable.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/schools', (req, res) => {
  schoolsResolver((schools) => {
    res.json(schools);
  });
});

app.get('/courses/:school', (req, res) => {
  coursesResolver(req.params.school, (school, courses) => {
    res.json(courses);
  });
});

app.get('/timetable/:school.:course', (req,res) => {
  var schoolObj = {code: req.params.school};
  var courseObj = {code: req.params.course};

  coursetimetableResolver(schoolObj, courseObj, (school,course,timetable) => {
    res.json(timetable);
  });

});

app.post('/timetable', (req, res) => {
  console.log(req.body.courses);
  // res.send("answer");
  rawTimetableOptions(req.body.courses, (options) => {
    timetableSolver(options, (calendars) => {
      console.log(calendarToTimetable(calendars[0]));
      res.json({calendar: calendarToTimetable(calendars[0])});
    })
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
