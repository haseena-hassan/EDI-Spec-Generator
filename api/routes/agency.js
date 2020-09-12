var agency = require('../controllers/Agency');

exports.getAgency = function(req,res){
	var params=req.body;
	var query={
		Agency : params.agency
	};

	agency.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

exports.getAllAgency = function(req,res){
	var params=req.body;
	var query={};

	agency.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}
