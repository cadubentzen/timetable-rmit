var https = require('https');
var htmlToJson = require('html-to-json');
var tabletojson = require('tabletojson');

module.exports = (school,course,callback) => {
  var options = {
    hostname: 'sts.rmit.edu.au',
    port: 443,
    path: '/STS-ReadOnly/results.jsp?ACAD_ORG='+school+'&SEMESTER=1650&OFFERING_ID='+course,
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
