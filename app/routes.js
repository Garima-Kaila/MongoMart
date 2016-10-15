module.exports = {
	create:function(app){
			app.get("/",function(req,res,next){
				res.render('home',{'name':'Welcome to Mongo Mart'});
			});


			app.post('/submit',function(req,res,next){
				res.send("Hello world !!");
			});
			
		}
}