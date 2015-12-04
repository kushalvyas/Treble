var nodexml = require('xml2js');
var fs = require('fs');
var parser = new nodexml.Parser();
var builder = new nodexml.Builder();
var slashes = require('slashes');

function set_output_path(){
	var path_config = ".//config//config.xml";
	var output_path = document.getElementById("output_path").value;
	output_path = slashes.add(output_path);
	var current_output_path = get_output_path();
	var to_write = "<app><output_path>"+output_path+"</output_path></app>";
	fs.writeFile(path_config, to_write, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	    alert("Output Path Modified to " + output_path, "Treble");
	}); 
}


// get output file

function get_output_path(){
	var current_output_path;
	fs.readFile(__dirname + '//config//config.xml', function(err, data){
		parser.parseString(data, function(error, result){
			console.log(result);
			console.log("done");
			current_output_path = result.app.output_path[0];
			current_output_path = slashes.add(current_output_path);
			
		});
	});
	
}
