/**
 * Created by garima05 on 15-10-2016.
 */
 
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var express = require('express'),
    app = express(),
    engines = require('consolidate');
var bodyParser = require('body-parser');

var Routes = require('./routes');

app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname+'/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

Routes.create(app);


function errorhandler(err,req,res){
    res.status(500);
    res.render('error',{error:err.message});
}
app.use(errorhandler);

app.listen(port,ipaddress);