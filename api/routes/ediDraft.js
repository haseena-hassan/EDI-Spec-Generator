var ediDraft = require('./controllers/EdiDraft.js');


exports.createDraft = function(req,res){

	var draft=req.body;
	
	draft['Username']=req.session.user;

	console.log(draft);

	ediDraft.create(draft,function(str){
		console.log(str);
		res.send(str);
	});

}

exports.getDraft = function(req,res){

	console.log(req.body);

	var query={
		'Username' : req.session.user,
		'FileType' : req.body.fileType
	};

	ediDraft.get(query,function(msg,data){

		console.log(msg);
		console.log(data);

		var obj=JSON.parse(msg);
		obj.data=data;

		res.send(JSON.stringify(obj));

		ediDraft.remove(query,function(msg,data){
			// console.log(msg);
			// console.log(data);
		});

	});
}