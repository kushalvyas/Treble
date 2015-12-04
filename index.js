var app  = require('app')
var BrowserWindow = require("browser-window")
// app.use(app.static(path.join(__dirname, 'libs')))


app.on('ready', function (){
	var mainWindow = new BrowserWindow({
		width  : 800,
		height : 600
	})

	
	mainWindow.setMenu(null);
	
	mainWindow.loadURL("file://"+__dirname + "/home.html") ;
	mainWindow.openDevTools();


	


});

app.on('window-all-closed', function() {
  app.quit();
 });




