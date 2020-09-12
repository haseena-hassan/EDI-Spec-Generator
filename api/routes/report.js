var ediLog = require('./controllers/EdiLog.js');


exports.getReport = function(req,res){
	var x;
	var params=req.body;
	var attribute=params.attribute;
	var filterFrom=new Date(params.from);
	var filterTo=new Date(params.to);
	var result={};
	var chartify=[];

	filterFrom=filterFrom.getTime()-(24 * 60 * 60 * 1000);
	filterTo=filterTo.getTime()+(24 * 60 * 60 * 1000);

	var query={
			"FileType" :  params.fileType ,
			"Timestamp" : { $gt : filterFrom, $lt : filterTo }
		};

	ediLog.get(query,function(msg,data){
		var obj=JSON.parse(msg);

		console.log(data);
		
		if(obj.status==true)
		{
			if(data==undefined)
			{
				data=[];
			}
			obj.numberOfLogs=data.length;
			for(x in data)
			{
				if(result[data[x][attribute]]!=undefined)
				{
					result[data[x][attribute]]++;
				}
				else
				{
					result[data[x][attribute]]=1;	
				}
			}
			for(x in result)
			{
				chartify.push([x,result[x]])
			}

			obj.data=chartify;
			console.log(chartify);
		}

		res.send(JSON.stringify(obj));		
	});
}