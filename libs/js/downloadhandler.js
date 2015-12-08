// var youtubedl = require('youtube-dl');
var punycode = require('punycode');
var utf8 = require('utf8');
var fs = require('fs');
var dialog =  require('dialog');
var nodexml = require('xml2js')
var parser = new nodexml.Parser();
var builder = new nodexml.Builder();
var finder = require('findit');
var slashes = require('slashes');
// var progressbar = require('')
/*function download(url){
	url = url.id;
	urlx = "https://www.youtube.com/watch?v=zWqm4lISrQk";
	url1 = utf8.encode(urlx);
	// url = punycode.encode(url);
	// url = String(url);
	
	var video = youtubedl(url1, [], { cwd: __dirname });
	video.on('info', function(info) {
	  console.log('Download started');
	  console.log('filename: ' + info.filename);
	  console.log('size: ' + info.size);
	});
	video.pipe(fs.createWriteStream('myvideo.mp4'));	
}

// function download(url){
// 	url = url.id;
// 	console.log(url);
// 	var fs = require('fs');
// 	var ytdl = require('ytdl-core');
// 	ytdl("https://www.youtube.com/watch?v=zWqm4lISrQk").pipe(fs.createWriteStream('test.flv'));	
// 	// ytdl(url)
// 	//   .pipe(fs.createWriteStream('abcd.flv'));

// 	// var video = ytdl()
// 	console.log('done');
// }

*/


var spawn = require('child_process').spawn;
	
var exec = require('child_process').exec;
function download(x){
	var	url = x.id;
	var urlstring =  utf8.encode(url);
	var progress = document.getElementById('downloadprogressbar_'+url.toString());
	progress.style.color = '#2196F3';
	// show_download_options(); to add blocking support
	// exec('youtube-dl '+urlstring, function(error, stdout, stderr) {
	//     console.log('stdout: ' + stdout);
	//     console.log('stderr: ' + stderr);
	//     if (error !== null) {
	//         console.log('exec error: ' + error);
	//     }
	// });
	var output_path = get_output_path();
	console.log(output_path);
	var output_string = output_path +"//"+ "%(title)s.%(ext)s\'  "
	console.log("urlstringtostring is :",urlstring.toString());
	var processString = 'youtube-dl '+ urlstring.toString();
	console.log(output_string);
	var node = spawn('youtube-dl', [urlstring,"-o",output_string,'--audio-format',"mp3" ,'--extract-audio']);
	console.log("spawning node process for youtube-dl", node);
	node.stdout.on('data',function(data){
		console.log(data.toString());
		progress.innerHTML = data.toString();
		
	});

	node.on("close", function (code) {
		console.log(code);
		if (code!=0){
			console.log(code);
			alert("Process has crashed","Treble");
		}else{
			var partial_url = urlstring.split("v=")[1];
			console.log(partial_url);
			console.log("process completed");
			// exec_mp3(partial_url);	

		}
	});
}


function show_download_options(){
	var message = "Do  you want mp3 ?";
	var title = "Download opts";
	dialog.info(message, title, function(err){
		console.log(err);
		if(!err){
			return true;
		}
		else{
			return false;
		}
	});
}




function get_output_path(){
	var text = fs.readFileSync(__dirname + '//config//config.xml', 'utf8');
	parser.parseString(text, function(err, data){
		text  = data;
	});
	var pop = text.app.output_path[0];
	pop = slashes.add(pop);
	return pop;
}


/*
@Async function for config file reading
function get_output_path1(callback_for_path){
	var current_output_path;
	
	fs.readFile(__dirname + '//config//config.xml', function(err, data){
		parser.parseString(data, function(error, result){
			console.log(result);
			console.log("done");
			// current_output_path = result.app.output_path[0];
			// current_output_path = slashes.add(current_output_path);
			// console.log(current_output_path);
			return callback_for_path(result);
			
		});
	});

}
*/