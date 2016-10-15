module.exports = {
	create:function(app){
			app.get("/",function(req,res){
				res.render('home',{'name':'Welcome to Mongo Mart'});
			});


			app.post('/submit',function(req,res){
				res.send("Hello world !!");
			});
			
		}
}