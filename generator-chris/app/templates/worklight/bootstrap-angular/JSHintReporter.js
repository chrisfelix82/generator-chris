var fs = require('fs');

module.exports = {
  reporter: function(errors){
	  fs.writeFileSync("../rexpress/frontend/jshint/results.json",JSON.stringify(errors));
  }
};