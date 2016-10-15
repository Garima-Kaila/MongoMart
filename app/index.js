/**
 * Created by garima05 on 15-10-2016.
 */
var express = require('express'),
    app = express(),
    engines = require('consolidate');
var bodyParser = require('body-parser');

app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname+'/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.get("/",function(req,res,next){
    res.render('home',{'name':'World'});
});


app.post('/',function(req,res,next){
    res.send("Hello world");
});


function errorhandler(err,req,res,next){
    console.error(err.message);
    //console.error(err.stack);
    res.status(500);
    res.render('error',{error:err.message});
}
app.use(errorhandler);

app.listen(3500);