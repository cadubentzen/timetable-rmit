var https = require('https');
var htmlToJson = require('html-to-json');

module.exports = (school,callback) => {
  var options = {
    hostname: 'sts.rmit.edu.au',
    port: 443,
    path: '/STS-ReadOnly/ro_courses.jsp?ACAD_ORG='+school+'&SEMESTER=1650',
    method: 'POST'
  };

  var parseHtml = function(html) {
    var promise = htmlToJson.parse(html, {
      'courses': ['#offering option', ($course) => {
        return {
          code: $course.val(),
          name: $course.text()
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
