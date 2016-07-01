var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Welcome to RMIT 2016 - Semester 2 Timetable planner</h2>
        <p>It is as simple as choosing as choosing your 4 courses. Notice that some courses have options for Bachelor and Master's program, so make sure you choose the right one.</p>
        <p>Some observations in order for this planner to work:</p>
        <ul>
          <li>Your timetables must be in a standard format. By that it means there must be no observations such as choose only Lecture+Tutorial or Lectorial or timetables for odd and even weeks.</li>
          <li>In case you don't recall this about a course, simply click on "Open Timetable on RMIT Portal" to check it up.</li>
        </ul>
        <p>(TO DO YET) That said, you can choose your priorities such as less days in the week, being early or late or classes being close (both in time and space) to each other.</p>
        <p>Test this planner and if any error or doubt, send me an email: caduaus@gmail.com. Cheers!</p>
      </div>
    )
  }
});
