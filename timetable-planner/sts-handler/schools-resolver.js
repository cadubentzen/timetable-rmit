var htmlToJson = require('html-to-json');

module.exports = (callback) => {
  htmlToJson.request(
    'https://sts.rmit.edu.au/STS-ReadOnly/ro_index.jsp',
    {
      'schools': ['#acad_org option', ($school) => {
        return {
          code: $school.val(),
          name: $school.text()
        };
      }]
    },
    (err,result) => {
      callback(result.schools);
    }
  );
}
