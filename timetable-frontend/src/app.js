var React = require('react');
var ReactDOM = require('react-dom');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Panel = require('react-bootstrap/lib/Panel');
var TimetableForm = require('./timetable-form.js');
var TimetableCalendar = require('./timetable-calendar.js');
var WelcomePage = require('./welcome-page.js');

var App = React.createClass({
  getInitialState: function() {
    return {showCalendar: false, calendar: {}};
  },
  calendarHandler: function(calendar) {
    console.log(calendar);
    if(calendar.length > 0) {
      this.setState({showCalendar: true, calendar: calendar});
    }
    else this.setState({calendar: false});
  },
  render: function() {
    var calendar = (this.state.showCalendar) ?
      <Col xs={12} md={8}>
        <TimetableCalendar calendar={this.state.calendar} />
      </Col> :
      <Col xs={12} md={8}>
        <WelcomePage />
      </Col>;
    return (
      <Grid fluid={true}>
        <Row>
          {calendar}
          <Col xs={12} md={4}>
            <Panel style={{marginTop: 10}}>
              <TimetableForm calendarHandler={this.calendarHandler} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
