var segmentUsage = require('../controllers/SegmentUsage.js');
var segmentDescription = require('../controllers/SegmentDescription.js');


exports.getSegmentUsage = function(req,res){
	var params=req.body;
	var obj={};
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"TransactionSetID" : params.transactionSet,
		"SegmentID" : params.segment
	};
	segmentUsage.get(query,function(msg,data){
		obj=JSON.parse(msg);
		obj.data=data;
		if(data!=undefined && data.length>0)
		{
			query={
				"Agency" : params.agency,
				"Version" : params.version, 
				"SegmentID" : params.segment
			};
			segmentDescription.get(query,function(msg,data){
				console.log(msg);
				console.log(data);
				msg=JSON.parse(msg);
				obj.status=msg.status;
				obj.message=msg.message;
				obj.description=data[0]['Description'];	
				res.send(JSON.stringify(obj));
			});
		}
		else
		{
			console.log("No segment found");
			res.send(JSON.stringify(obj));
		}
	});	
}

exports.getSegmentUsageFromPosition = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"TransactionSetID" : params.transactionSet,
		"Position" : params.segment
	};
	console.log(query);
	segmentUsage.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		//res.send(JSON.stringify(obj));
		if(data&&data.length>0)
		{
			query={
				"Agency" : params.agency,
				"Version" : params.version, 
				"SegmentID" : data[0]['SegmentID']
			};
			console.log(query);
			segmentDescription.get(query,function(msg,data){
				console.log(msg);
				console.log(data);
				msg=JSON.parse(msg);
				obj.status=msg.status;
				obj.message=msg.message;
				obj.description=data[0]['Description'];	
				res.send(JSON.stringify(obj));
			});
		}
		else
		{
			console.log("No segment found");
			res.send(JSON.stringify(obj));
		}
	});
}

exports.getAllSegmentUsage = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"TransactionSetID" : params.transactionSet,
	};
	segmentUsage.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}