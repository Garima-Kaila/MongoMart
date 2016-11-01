/**
 * Created by garima05 on 31-10-2016.
 */
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var http = require('http');
var routes = require('./routes');


http.createServer((req, res) => {
    routes.serve(req, res);
}).listen(port,ipaddress);

