var React = require('react');

var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Button = require('react-bootstrap/lib/Button');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

var Select = require('react-select');

var request = require('superagent');

var SelectSchool = React.createClass({
  getInitialState: function() {
    return {selectValue: ''};
  },
  schoolHandler: function(e) {
    var self = this;
    this.setState({selectValue: e});
    var schoolCode = e;//.target.value;
    if(schoolCode == "-1") return;
    request
     .get("/courses/"+schoolCode)
     .end(function(err,res) {
       if(err) throw err;

       self.props.selectHandler(schoolCode,res.body,self.props.index);
     });
  },
  render: function() {
    var options = this.props.schools.map(function(school) {
      return {
        value: school.code,
        label: school.name
      };
      // <option value={school.code} key={school.code}>{school.name}</option>;
    });
    return (
      <Select
        value={this.state.selectValue}
        simpleValue
        searchable={true}
        options={options}
        onChange={this.schoolHandler}
      />
    );
    // <FormControl componentClass="select" onChange={this.schoolHandler}>
    //   {options}
    // </FormControl>
  }
});

var SelectCourse = React.createClass({
  getInitialState: function() {
    return {selectValue: ''};
  },
  courseHandler: function(e) {
    this.setState({selectValue: e});
    var courseCode = e;//.target.value;
    this.props.selectHandler(courseCode,this.props.index);
  },
  render: function() {
    var options = this.props.courses.map(function(course) {
      return {
        value: course.code,
        label: course.name
      };
      // return <option value={course.code} key={course.code}>{course.name}</option>;
    });
    return (
      <Select
        value={this.state.selectValue}
        simpleValue
        searchable={true}
        options={options}
        onChange={this.courseHandler}
      />
      // <FormControl componentClass="select" onChange={this.courseHandler}>
      //   {options}
      // </FormControl>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      schools: [],
      courses: [[],[],[],[]],
      coursesChosen: [
        {
          "school": "",
          "course": ""
        }
      ]
    };
  },
  componentDidMount: function() {
    var self = this;
    request
      .get("/schools")
      .end(function(err,res) {
        if(err) throw err;
        self.setState({schools: res.body});
      });
  },
  selectSchoolHandler: function(school,courses,index) {
    var newCourses = this.state.courses;
    newCourses[index] = courses;
    var newCoursesChosen = this.state.coursesChosen;
    newCoursesChosen[index].school = school;
    newCoursesChosen[index].course = "";
    this.setState({courses: newCourses, coursesChosen: newCoursesChosen});
  },
  selectCourseHandler: function(course,index) {
    var newCoursesChosen = this.state.coursesChosen;
    newCoursesChosen[index].course = course;
    this.setState({coursesChosen: newCoursesChosen});
  },
  validateCoursesChosen: function() {
    var flag = false;
    this.state.coursesChosen.forEach(function(course) {
      if(course.school == '' || course.course == '') {
        flag = true;
      }
    });
    return flag;
  },
  submitHandler: function(e) {
    e.preventDefault();
    var self = this;
    if(this.validateCoursesChosen()) return;
    request
     .post("/timetable")
     .send({courses: this.state.coursesChosen})
     .end(function(err, res) {
       if(err) throw err;

       self.props.calendarHandler(res.body.calendar);
     });
  },
  addCourseHandler: function() {
    var newCoursesChosen = this.state.coursesChosen;
    newCoursesChosen.push({school: '', course: ''});
    this.setState({coursesChosen: newCoursesChosen});
  },
  render: function() {
    var self = this;
    var courseSelects = this.state.coursesChosen.map(function(course,index) {
      return (
        <div key={index}>
          <FormControl.Static><b><i>Course {index+1}</i></b></FormControl.Static>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} md={4}>
              School
            </Col>
            <Col md={8}>
              <SelectSchool schools={self.state.schools} index={index} selectHandler={self.selectSchoolHandler}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} md={4}>
              Course
            </Col>
            <Col md={8}>
              <SelectCourse courses={self.state.courses[index]} index={index} selectHandler={self.selectCourseHandler}/>
            </Col>
          </FormGroup>
        </div>
      );
    })
    return (
      <Form horizontal onSubmit={this.submitHandler}>
        {courseSelects}
        <Button block bsStyle="primary" onClick={this.addCourseHandler}>
          Add another course
        </Button>
        <Button block bsStyle="success" type="submit">
          Solve Timetable
        </Button>
      </Form>
    );
  }
});
