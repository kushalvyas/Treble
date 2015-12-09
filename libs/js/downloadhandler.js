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

function download1(x){

	var x1 = show_download_options();
	download_main(x,x1);
}


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
	// var processlist = show_download_options(urlstring, output_string);

	// defining processlist for spawning the  process
	// if(downloadMP3){
	// 	var processlist = [urlstring,"-o",output_string,'--audio-format',"mp3" ,'--extract-audio'];
	// }else{
	// 	var processlist = [urlstring,"-o",output_string];
	// }
	var processlist = [urlstring,"-o",output_string,'--audio-format',"mp3" ,'--extract-audio'];
	console.log(processlist)
	progress.innerHTML = "Initiating Download..."
	var node = spawn('youtube-dl', processlist);
	console.log("spawning node process for youtube-dl", node);
	node.stdout.on('data',function(data){
		console.log(data.toString());
		if(data.toString().substring(0,9) == "[youtube]"){
			progress.innerHTML = "Beginning Download...";
		}else{

			var indexofcolon = data.toString().indexOf(']');
			var stripped_data = data.toString().substring(indexofcolon+1,data.toString().length);
			if(stripped_data.substring(0,8) != 'Deleting')
				progress.innerHTML = stripped_data.toString();
			if(stripped_data.substring(0,8) == "Deleting"){
				progress.innerHTML = "Done";
			}
			// write if else tree...to segregate [youtube]. [download] and [ffmpeg commands] as well as Deleting Commands
			// "No need to display dash manifest data...instead show initiating download"
		}

		
	});

	node.on("close", function (code) {
		console.log(code);
		if (code!=0){
			console.log(code);
			alert("Process has crashed","Treble");
			progress.innerHTML = "Oops.. Some problem occured...!"
		}else{
			var partial_url = urlstring.split("v=")[1];
			console.log(partial_url);
			console.log("process completed");
			// exec_mp3(partial_url);	
			progress.innerHTML = "Done";

		}
	});
}


function show_download_options(urlstring, output_string){
	var message = "Do  you want mp3 ? \nPress OK to download mp3 \nClose dialog to continue with video download ";
	var title = "Download opts";
	dialog.info(message, title, function(err){
		console.log(err);
		
		// if(!err){
		// 	var processlist = [urlstring,"-o",output_string,'--audio-format',"mp3" ,'--extract-audio'];
		// 	return processlist;
		// }
		// else{
		// 	var processlist = [urlstring,"-o",output_string];
		// 	return processlist;
		// }
		if(!err){
			return true;
		}else{
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