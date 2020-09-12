var version = require('./controllers/Version.js');

exports.getVersion = function(req,res){
	var params=req.body;
	var query={
		Agency : params.agency ,
		Version : params.version
	};
	version.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

exports.getAllVersion = function(req,res){
	var params=req.body;
	var query={
		Agency : params.agency ,
	};
	version.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}