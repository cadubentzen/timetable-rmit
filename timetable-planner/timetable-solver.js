var emptyWeekCalendar = () => {
  var calendar = {
    Monday:    {},
    Tuesday:   {},
    Wednesday: {},
    Thursday:  {},
    Friday:    {}
  };
  for(var key in calendar) {
    var i = 800;
    while(i < 2230) {
      calendar[key][i] = '';
      if(i%100 == 0) i = i+30;
      else i = i+70;
    }
  }
  return calendar;
}

var calendars = [];

var recTimetableSolve = (agendas,calendar) => {
  if(agendas.length == 0) {
    calendars.push(calendar);
    return;
  }
  var newAgendas = agendas.slice();
  var firstAgenda = newAgendas.shift();
  firstAgenda.forEach((option) => {
    var newCalendar = (JSON.parse(JSON.stringify(calendar)));
    var timeslotLength = option.timeslot.length;
    for(var i=0; i<timeslotLength; i++) {
      if(newCalendar[option.day][option.timeslot[i]].length > 0) {
        // console.log('Already: ' + newCalendar[option.day][option.timeslot[i]]);
        // console.log('Trying to: ' + option.name);
        return;
      }
      newCalendar[option.day][option.timeslot[i]] = option.name;
    }
    recTimetableSolve(newAgendas,newCalendar);
  });
}

var timetableSolve = (options,callback) => {
  // while(calendars.length == 0) {
  //   calendars = [];
    var emptyCalendar = emptyWeekCalendar();
    recTimetableSolve(options,emptyCalendar);
  // }
  callback(calendars);
};

module.exports = timetableSolve;
