document.write("Hey " + process.version);

var fs = require('fs')

var contents = fs.readFileSync("./package.json","utf8")

alert(contents);