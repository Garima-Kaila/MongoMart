/**
 * Created by garima05 on 31-10-2016.
 */


var http = require('http');
var routes = require('./routes');

var port = 8080;
var server = "localhost";

http.createServer((req, res) => {
    routes.serve(req, res);
}).listen(port,function(){
    console.log("Server running at http://"+ server + ":" + port);
});

