
// var progressbar = require("progressbar.js");
// var line = new ProgressBar.Line('downloadprogressbar', { color:"#000000" });


// Search for a specified string.


function search() {
  var search_container = $('#search-container');

  search_container.empty();
  var q = $('#query').val();
  console.log("query values is ",q);
  var x = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q="+q+"&key=AIzaSyB1EFn3fdf5TvJybLqMPXfXf5Ul0kCR9_k"
  var str = httpGetAsync(x, callback);
  console.log("str = ",str);
}

function httpGetAsync(theUrl, callback){
    
    

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
            // console.log(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function callback(x){
  var search_container = $('#search-container');
  var jsonobj = JSON.parse(x);
  // console.log(jsonobj.items);
  for(var i=0;i<jsonobj.items.length;i++){
    if ( jsonobj.items[i].id.kind == "youtube#video"){
      // console.log("true");
      // console.log(jsonobj.items[i]);
      var url = "http://www.youtube.com/watch?v=" + jsonobj.items[i].id.videoId;
      var button_span = "<div class= 'mui--text-right'><button type='button' id = '"+ url +"' align='right' class='mui-btn mui-btn--primary mui-btn--fab ' aria-label='Right Align' onclick='download(this)'>"+
                        "<i class='fa fa-download'></i></button></div>";
      var title = jsonobj.items[i].snippet.title;
      // var data_in_row = "<h4>"+ title+button_span+"</h4><h6>"+url+"</h6>";
      var id_p = "<p id='downloadprogressbar_" + url.toString() + "'></p>";
      button_span+=id_p;
      var data_in_row = "<h4>"+ title+button_span+"</h4>";
      var row = "<p>" + data_in_row + "</p>";
      search_container.append(row);
    }
  }

  console.log("done...fetched results");

}
