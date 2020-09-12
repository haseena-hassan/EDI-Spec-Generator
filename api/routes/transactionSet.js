var transactionSet = require('./controllers/TransactionSet.js');


exports.getTransactionSet = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency ,
		"Version" : params.version,
		"TransactionSet" : params.transactionSet				
	};
	transactionSet.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

exports.getAllTransactionSet = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency ,
		"Version" : params.version,				
	};
	transactionSet.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}