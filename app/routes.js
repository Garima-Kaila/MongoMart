module.exports = {
	create:function(app){
			app.get("/",function(req,res,next){
				res.render('home',{'name':'World'});
			});


			app.post('/create',function(req,res,next){
				res.send("Hello world !!");
			});
			
		}
}