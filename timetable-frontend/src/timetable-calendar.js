var React = require('react');
var BigCalendar = require('react-big-calendar');
var moment = require('moment');

// var events = [
//   {
//     'title': 'All Day Event',
//     'allDay': true,
//     'start': new Date(2015, 3, 0),
//     'end': new Date(2015, 3, 0)
//   }
// ];

BigCalendar.momentLocalizer(moment);

module.exports = React.createClass({
  render: function() {
    var min = new Date();
    min.setHours(7); min.setMinutes(0);
    var max = new Date();
    max.setHours(22); max.setMinutes(0);

    console.log(this.props.calendar);

    var events = this.props.calendar.map(function(event) {
      return {
        title: event.title,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate()
      };
    });


    return (
      <div className="timetableCalendar" style={{marginTop: 20}}>
        <BigCalendar style={{maxHeight: 600}}
          defaultView='week'
          views={['week']}
          toolbar={false}
          min={min}
          max={max}
          events={events}
        />
      </div>
    );
  }
});
