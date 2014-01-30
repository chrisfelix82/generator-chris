require(["express","http","socket.io","backend/global"],function(express,http,socketio,global){
	
	 var app = express();
	 var server = http.createServer(app);
	 var io = socketio.listen(server);
	  
	 var dirFilter = function(file){
		if(file.indexOf(".json") < 0 && file.indexOf(".png") < 0){
			return true;
		}else{
			return false;
		}//end if 
	 };
	 
	  app.configure(function(){
		 app.use(express.bodyParser());
		 app.use(express.static(require.toUrl("shared")));
		 app.use(express.static(require.toUrl("frontend")));
		 app.use(express.directory(require.toUrl("frontend"),{
			 filter: dirFilter
		 }));
	  });

	server.listen(3434);
	
	global.app = app;
	global.server = server;
	global.io = io;
	
	require(["backend/rest/Resources"],function(){
		console.log("Loaded RESTful resources from backend/rest/resources");
	});
	
});