var https = require('https');
var htmlToJson = require('html-to-json');
var tabletojson = require('tabletojson');
const fs = require('fs');

var _schools = (callback) => {
  htmlToJson.request(
    'https://sts.rmit.edu.au/STS-ReadOnly/ro_index.jsp',
    {
      'schools': ['#acad_org option', ($school) => {
        return {
          value: $school.val(),
        text: $school.text()
        };
      }]
    },
    (err,result) => {
      callback(result.schools);
    }
  );
}

var _courses = (school,callback) => {
  var acad_org = school.value;
  var options = {
    hostname: 'sts.rmit.edu.au',
    port: 443,
    path: '/STS-ReadOnly/ro_courses.jsp?ACAD_ORG='+acad_org+'&SEMESTER=1650',
    method: 'POST'
  };

  var parseHtml = function(html) {
    var promise = htmlToJson.parse(html, {
      'courses': ['#offering option', ($course) => {
        return {
          value: $course.val(),
          text: $course.text()
        };
      }]
    }, (err, result) => {
      callback(school,result.courses);
    });
  }

  var html;

  var req = https.request(options, (res) => {
    res.on('data', (d) => {
      html += d.toString();
    });
    res.on('end', () => {
      parseHtml(html);
    })
  });
  req.end();
}

_courseTimetable = (school,course,callback) => {
  var acad_org = school.value;
  var offering_id = course.value;
  var options = {
    hostname: 'sts.rmit.edu.au',
    port: 443,
    path: '/STS-ReadOnly/results.jsp?ACAD_ORG='+acad_org+'&SEMESTER=1650&OFFERING_ID='+offering_id,
    method: 'POST'
  };

  // var timetable = {};
  // var cleanTimetable = {};

  var clearTimetable = (timetable) => {
    var cleanTimetable = {};
    for(var key in timetable) {
      cleanTimetable[key] = timetable[key].map((item) => {
        var timeslot = [];
        var start = Math.floor(parseFloat(item['Start time'])*100);
        var end = Math.floor(parseFloat(item['End time'])*100);
        while(start < end) {
          timeslot.push(start);
          if(start % 100 == 0) start += 30;
          else if((start-30) % 100 == 0) start += 70;
        }
        return {
          name: item['Name of activity'],
          building: item['Building'],
          day: item['Day'],
          timeslot: timeslot
        };
      })
    }
    callback(school,course,cleanTimetable);
  };

  var processResult = (result) => {
    var timetable = {};
    var i = 0;
    result.tables.forEach((table) => {
      var tableAsJson = tabletojson.convert(table.table);
      timetable[tableAsJson[0][0]['Type of activity']] = tableAsJson[0];
    });
    clearTimetable(timetable);
  };

  var parseHtml = (html) => {
    var promise = htmlToJson.parse(html, {
      'tables': ['table', ($table) => {
        return {
          table: $table.toString()
        };
      }]
    }, (err, result) => {
      processResult(result);
    });
  };

  var html;

  var req = https.request(options, (res) => {
    res.on('data', (d) => {
      html += d.toString();
    });
    res.on('end', () => {
      parseHtml(html);
    })
  });
  req.end();
};

var coursesPerSchool = {};
var i = 0;
var nschools;

var processCourses = (school,courses) => {
  coursesPerSchool[school.value] = {
    name: school.text,
    courses: courses
  };
  // When all in object, save in JSON file
  if(++i == nschools) {
    var str = JSON.stringify(coursesPerSchool);
    fs.writeFile('./jsonFiles/coursesPerSchool.json', str, (err) => {
      if (err) throw err;
      console.log('Courses per School are saved!');
    });
  }
}

var processSchools = (schools) => {
  // First write to file
  var str = JSON.stringify(schools);
  fs.writeFile('./jsonFiles/schools.json', str, (err) => {
    if (err) throw err;
    console.log('Schools are saved!');
  });
  // Then fill array
  nschools = schools.length;
  schools.forEach((school) => {
    _courses(school,processCourses);
  });
};

_schools(processSchools);
