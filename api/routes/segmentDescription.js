var segmentDescription = require('./controllers/SegmentDescription.js');


exports.getSegmentDescription = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"SegmentID" : params.segment
	};
	segmentDescription.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;	
		res.send(JSON.stringify(obj));
	});	
}