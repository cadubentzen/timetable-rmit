var moment = require('moment');

var dayToNumber = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6
};

module.exports = (calendar) => {
  var timetable = [];
  for(var day in calendar) {
    var start = '';
    var end = '';
    var course = '';
    for(var hour in calendar[day]) {
      if(calendar[day][hour] != course) {
        if(start == '') {
          start = hour;
          course = calendar[day][hour];
        }
        else if(end == '') {
          end = hour;
          timetable.push({
            'title': course,
            'day': dayToNumber[day],
            'start': start,
            'end': end
          });
          course = calendar[day][hour];
          if(course == '') {
            start = '';
            end = '';
          }
          else {
            start = hour;
            end = '';
          }
        }
      }
    }
  }

  var events = timetable.map((event) => {
    var start;
    event.start.replace(/(\d+)(\d{2})$/,(match, hh, mm, offset, string) => {
      start = moment();
      start.day(event.day);
      start.hour(parseInt(hh));
      start.minute(parseInt(mm));
      start = start.toDate();
    });

    var end;
    event.end.replace(/(\d+)(\d{2})$/,(match, hh, mm, offset, string) => {
      end = moment();
      end.day(event.day);
      end.hour(parseInt(hh));
      end.minute(parseInt(mm));
      end = end.toDate();
    });

    title = event.title.replace(/-AUSCY-S2/,'');
    title = title.replace(/-AUSBU-S2/,'');

    return {
      title: title,
      start: start,
      end: end
    };
  });

  return events;
};
