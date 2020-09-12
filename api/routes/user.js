var firebaseCredentials    = require('../config/firebaseConfig')
var firebase = require("firebase");

//firebase auth setup(admin not added)
firebase.initializeApp(firebaseCredentials);

exports.authenticate = function(req,res)
{
	var params=req.body;
	var username=params.user;
	var password=params.password;
	var userFound=false;
	if(username==null||username==''||password==null||password=='')
	{
		console.log();
		res.send({status:false,message:'Parameter Problem'});
	}
	else
	{
		firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode + "haha");
			console.log(errorMessage);
			console.log("Mayday!!!");
			console.log(username);
		  });
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {

				console.log("user logged in");
				// User is signed in.
				var displayName = user.displayName;
				var email = user.email;
				req.session.user=email;
				req.session.privilege=1;
				if(email == "haseena2199@gmail.com")
					req.session.privilege=0;
				else
					req.session.privilege=1;
				req.session.name=email;
				console.log(displayName+email);
			  	res.send({status:true,message:'Authentication Success'});
			} else {
				console.log("User not found or... something else");
			}
		});
	}
}



/*
Middleware functions for api/*
*/

//Authentication and session management with LDAP

// exports.authenticate = function(req,res)
// {
// 	var params=req.body;
// 	var username=params.user;
// 	var password=params.password;
// 	var userFound=false;

// 	if(username==null||username==''||password==null||password=='')
// 	{
// 		res.send({status:false,message:'Parameter Problem'});
// 	}
// 	else
// 	{
// 		// var data={
// 		// 	username : username
// 		// };
// 		// var result=handleUserQueryTemplate(data);

// 		var opts = {
// 		  filter: ldapConfig.usernameAttribute+'='+username,
// 		  scope: 'sub',
// 		  attributes: ['dn','cn']
// 		};
	
// 		ldapClient.search(ldapConfig.baseDN,opts, function(err, result) {
		  
// 		  result.on('searchEntry', function(entry) {
// 		    console.log('entry: ' + JSON.stringify(entry.object));
		   	
// 		   	var name=entry.object['cn'];

// 		   	console.log('name'+name);

// 		    if(!userFound)
// 		    {
// 		    	userFound=true;
// 		    	var bindParams=entry['dn'];
		    
// 		    	ldapClient.bind(bindParams, password, function(err) {	  	
// 					if(!err)
// 					{
// 						req.session.user=username;
// 						req.session.privilege=1;
// 						req.session.name=name;

// 						// if(username==ldapConfig.admin)
// 						// {
// 						// 	req.session.privilege=0;
// 						// }

// 						var opts = {
// 						  filter: ldapConfig.adminMemberAttribute+'='+bindParams,
// 						  scope: 'sub',
// 						  attributes: ['dn']
// 						};

// 						console.log('adminOpts');
// 						console.log(opts);

// 						ldapClient.search(ldapConfig.adminGroup,opts, function(err, result) {
						
// 							result.on('searchEntry', function(entry) {
// 								console.log('admin');
// 								req.session.privilege=0;
// 		  					});
// 		  					result.on('searchReference', function(referral) {
// 							    console.log('referral: ' + referral.uris.join());
// 							});
// 							result.on('error', function(err) {
// 							  console.error('admin error: ' + err.message);
// 							});
// 							result.on('end', function(result) {
// 							  console.log('status: ' + result.status);
// 							  res.send({status:true,message:'Authentication Success'});
// 							});

// 						});
// 					}
// 					else
// 					{
// 						req.session.user='';
// 						var t={status:false,message:'Password Incorrect'};
// 						res.send(t);	
// 					}
// 				});

// 		    }
// 		  });
// 		  result.on('searchReference', function(referral) {
// 		    console.log('referral: ' + referral.uris.join());
// 		  });
// 		  result.on('error', function(err) {
// 		    console.error('error: ' + err.message);
// 		  });
// 		  result.on('end', function(result) {
// 		    console.log('status: ' + result.status);
// 		    if(!userFound)
// 		  	{
// 		  		res.send({status:false,message:'Invalid User'});	
// 		  	}
// 		  });
// 		});

// 		//res.send({status:false,message:'Authentication Success'});

// 		// ldapClient.bind("cn=arjun,c=in,ou=bluepages,dc=test,dc=com", "arjun", function(err) {	  	
// 		// 	if(!err)
// 		// 	{
// 		// 		req.session.user=username;
// 		// 		req.session.privilege=1;

// 		// 		if(username==ldapConfig.admin)
// 		// 		{
// 		// 			req.session.privilege=0;
// 		// 		}

// 		// 		res.send({status:true,message:'Authentication Success'});
// 		// 	}
// 		// 	else
// 		// 	{
// 		// 		req.session.user='';
// 		// 		var t={status:false,message:'Invalid User',error: err};
// 		// 		res.send(t);	
// 		// 	}
// 		// });
// 	}
// }

exports.getSession = function (req,res){
	// console.log(req.session);
	if(req.session.user)
	{
		console.log("name :"+req.session.name)
		res.send({ status:true , privilege : req.session.privilege,name : req.session.name });
	}
	else
	{
		res.send({ status:false , privilege : -1 });
	}
}

exports.clearSession = function(req,res){
	delete req.session.user;
	delete req.session.privilege;
	delete req.session.name;
	firebase.auth().signOut().then(function() {
		console.log("logged out");
	}).catch(function(error) {
		console.log("error logging out");
	});
	res.send({ status:true });
}