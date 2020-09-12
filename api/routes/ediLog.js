var ediLog = require('./controllers/EdiLog.js');


exports.logEdiGuideCreation = function (req,res){
	var log=req.body;
	
	log['Username']=req.session.user;
	log['Timestamp']=Date.now();

	console.log(log);

	ediLog.create(log,function(str){
		console.log(str);
		res.send(str);
	});
}

exports.getLatestVersion = function(req,res){

	var params=req.body;

	console.log(params);

	var query={
		"Agency" : params.agency,
		"Version" : params.version,
		"TransactionSet" : params.transactionSet,
		"BusinessPartner" : params.businessPartner
	}

	ediLog.getMaxVersion(query,function(msg,data){
				var obj=JSON.parse(msg);
				if(data!=null&&data.length>0)
				{
					obj.data=data[0]['FileVersion'];
				}	
				else
				{
					obj.data=[];
				}
				res.send(JSON.stringify(obj));
			});	

}

exports.getEdiGuideLog = function(req,res){

	var params=req.body;

	//Stripping spaces
	params.version=params.version.replace(' ',"[\\s]*");
	// params.user=req.session.user.replace(' ','');
	// params.businessPartner=params.businessPartner.replace(' ','');
	// params.transactionSet=params.transactionSet.replace(' ','');

	console.log('filters');
	var filterFrom=new Date(params.from);
	console.log(filterFrom);
	filterFrom=filterFrom.getTime()+(24 * 60 * 60 * 1000);
	var filterTo=new Date(params.to);
	console.log(filterTo);
	filterTo=filterTo.getTime()+(24 * 60 * 60 * 1000);

	if(req.session.user)
	{
		if(req.session)
		{
			// if(req.session.privilege==1)
			// {
			// 	var query={
			// 		"Username" : params.user,
			// 		"BusinessPartner" : new RegExp(params.businessPartner, "i"),
			// 		"TransactionSet" : new RegExp(params.transactionSet,"i"),
			// 		"Version" : new RegExp(params.version,"i"),
			// 		"Timestamp" : { $gt : filterFrom, $lt : filterTo }		
			// 	};
			// }
			// else if(req.session.privilege==0){
				var query={
					"Username" : new RegExp(params.createdBy, "i"),
					"FileType" : params.fileType,
					"BusinessPartner" : new RegExp(params.businessPartner, "i"),
					"TransactionSet" : new RegExp(params.transactionSet,"i"),
					"Version" : new RegExp(params.version,"i"),
					"Timestamp" : { $gt : filterFrom, $lt : filterTo }		
				};	
			// }

			console.log(query);

			ediLog.get(query,function(msg,data){
				var obj=JSON.parse(msg);
				obj.data=data;
				res.send(JSON.stringify(obj));
			});
		}
		else
		{
			res.send({status:false,message:'Unauthorised'});
		}
	}
	else{
		res.send({status:false,message:'Unauthorised'});
	}
}

