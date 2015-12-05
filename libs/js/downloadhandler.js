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

function download(x){
	exec_mp3("Will");
}

var spawn = require('child_process').spawn;
	
var exec = require('child_process').exec;
function download1(x){
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
	var node = spawn('youtube-dl', [urlstring,"-o",output_string]);
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
			exec_mp3(partial_url);	

		}
	});
}

function exec_mp3(url){
	var filename = null;
	// var path = "C:\\Users\\bini\\Desktop\\treble\\"; // get output path
	// console.log("path is ",path);
	// path = get_output_path(function(name){
	// 	var test = name;
	// 	console.log("name  = ",name);
	// 	test = name.app.output_path[0];
	// 	test = slashes.add(test);
	// 	return test;
	// });
	var path = get_output_path();
	console.log("path is ",path);

	// var checkfinder = finder(path+"//"+url);
	// checkfinder.on("file", function(file){
	// 	if(file.indexOf(url) > -1){
	// 		console.log("files = ", file);
	// 		filename = file;
	// 		filename = slashes.add(filename);
	// 		console.log(filename);
	// 		var updated_filename = filename 	
	// 		var list = ['-i', updated_filename, '-acodec', 'libmp3lame',filename+'.mp3'];
	// 		var ffmpeg = spawn("ffmpeg", list);
	// 		console.log(ffmpeg, list);
	// 		ffmpeg.stdout.on('data',function(data){
	// 			console.log(data);
	// 		});
	// 		ffmpeg.on('error', function(error){
	// 			console.log(error);
	// 		});
	// 	}

	// });


	console.log("path is  : ",path);
	var process_find= "find "+path+ " -type f -name \"*"+url + "*\"";
	console.log(process_find); 
	exec(process_find, function (error, stdout, stderr){
		console.log('error' + error);
		console.log('stdout' + stdout);
		console.log('stderr' + stderr);
		filename = stdout.substr(0, stdout.length -1);
		console.log("filename  : ", filename);
		if(error != null){
			alert("Error in file read operation");
		}
		else{
			var list = ['-i',filename,'-acodec','libmp3lame',filename+'.mp3'];
			var ffmpeg = spawn("ffmpeg",list);
			console.log(ffmpeg , list);
			ffmpeg.stdout.on('data', function(data){
				console.log('data is : ' + data);
			});
			ffmpeg.on('error',function(error){
				console.log(error);
			});
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