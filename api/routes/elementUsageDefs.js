var elementUsageDefs = require('../controllers/ElementUsageDefs.js');
var code = require('../controllers/Code.js');


//local variables
var numberOfElements=0;
var numberOfElementsRetrieved=0;


exports.getMandatoryElementStatus = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"SegmentID" : params.segmentId,
		"RequirementDesignator" : 'M'
	};
	elementUsageDefs.getOne(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

exports.getElementUsageDefs = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"SegmentID" : params.segmentId
	};
	elementUsageDefs.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

exports.getElementUsageDefsFromPosition = function(req,res){
	var params=req.body;
	var segmentPosition=params.segmentPosition;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"SegmentID" : params.segmentId,
		"Position" : params.position
	};

	console.log(query);
	elementUsageDefs.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		obj.segmentPosition=segmentPosition;
		res.send(JSON.stringify(obj));
	});
}

exports.getElementUsageDefsWithCode = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version, 
		"SegmentID" : params.segmentId
	};
	elementUsageDefs.getWithCode(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		numberOfElements=data.length;
		if(numberOfElements==0)
		{
			res.send(obj);
		}
		else
		{
			numberOfElementsRetrieved=0;
			getCodeWithElement(obj,res);
		}
	});	
}


exports.getCode = function(req,res){
	var params=req.body;
	var query={
		"Agency" : params.agency,
		"Version" : params.version,
		"ElementID" : params.element		
	};

	code.get(query,function(msg,data){
		var obj=JSON.parse(msg);
		obj.data=data;
		res.send(JSON.stringify(obj));
	});
}

function getCodeWithElement(obj,res){
	// console.log(numberOfElementsRetrieved+"/"+numberOfElements);
	if(numberOfElementsRetrieved<numberOfElements)
	{
		obj.data[numberOfElementsRetrieved]['Code']="";
		var params=obj.data[numberOfElementsRetrieved];
		var query={
			"Agency" : params['Agency'],
			"Version" : params['Version'],		
			"ElementID" : params['ElementID']
		};

		code.getOne(query,function(msg,data){
			obj.data[numberOfElementsRetrieved]['Code']=JSON.parse(msg)['status'];					
			//console.log(msg["message"]);
			// console.log(obj.data[numberOfElementsRetrieved]['Code']);
			// obj.data[numberOfElementsRetrieved]['code']=msg.status;
			numberOfElementsRetrieved++;
			getCodeWithElement(obj,res);
		});		
	}
	else
	{
		res.send(obj);
		// res.send(JSON.stringify(obj.data.Code));
	}
}
