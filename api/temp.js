exports.index = function (req, res) {
	if(res){
		res.send('You got yourself into the api');
	}
	else{
		res.send('Invalid Request');
	}
}



// Routes
// const users = require('./routes/api/users')
// app.use("/api/users", users)
// ROUTES
// ==============================================
//app.use('/',router);
//routes for api
const api = require('./api/index')
app.use('/',api);


// app.post('/api/user/authenticate',api.authenticate);
// app.post('/api/user/session',api.getSession);
// app.post('/api/user/logout',api.clearSession);


// app.post('/api/agency/get',api.getAgency); 										//get Agency----parameters * agency
// app.post('/api/agency/getAll',api.getAllAgency); 								// get All Agency

// app.post('/api/version/get',api.getVersion);									//get Version----parameters  * agency * version
// app.post('/api/version/getAll',api.getAllVersion);								//get All Version

// app.post('/api/transactionSet/get',api.getTransactionSet);						//get TransactionSet----parameters * agency * version * transactionSet
// app.post('/api/transactionSet/getAll',api.getAllTransactionSet);				//get All TransactionSet

// app.post('/api/segmentDescription/get',api.getSegmentDescription);

// app.post('/api/segmentUsage/get',api.getSegmentUsage);							//get SegmentUsage----parameters * agency * version * transactionSet * segment
// app.post('/api/segmentUsage/getFromPosition',api.getSegmentUsageFromPosition);	//get SegmentUsage from position
// app.post('/api/segmentUsage/getAll',api.getAllSegmentUsage);					//get All SegmentUsage


// app.post('/api/elementUsageDefs/get',api.getElementUsageDefs);					//get Element Usage Defs---parameters * agency * version * segmentId
// app.post('/api/elementUsageDefs/getFromPosition',api.getElementUsageDefsFromPosition);		// get list of ElementUsageDefs with position being the ordering parameter	
// app.post('/api/elementUsageDefs/getWithCode',api.getElementUsageDefsWithCode);
// app.post('/api/elementUsageDefs/getMandatoryElementStatus',api.getMandatoryElementStatus);

// app.post('/api/code/get',api.getCode);												//get Code*

// app.post('/api/pdf/create',api.getPdf);												//Get pdf file

// app.post('/api/ediLog/create',api.logEdiGuideCreation);
// app.post('/api/ediLog/get',api.getEdiGuideLog);
// app.post('/api/ediLog/latestFileVersion',api.getLatestVersion);

// app.post('/api/edi/saveAsDraft',api.createDraft);
// app.post('/api/edi/getDraft',api.getDraft);

// app.post('/api/report/get',api.getReport);

// app.use('/', routes.index);
 


   





'use strict';
 
const express = require("express")
const router = express.Router()

//User defined Directories
const agen = require('./temp')

router.get("/api", agen.index);


module.exports = router








//Get Agency Api /api/getAgency


//Get Version Api /api/getVersion


//Get Transaction Set Api /api/getTransactionSet


//Get Segment Description Api /api/segmentDescription/get




//Get Segment Usage Api /api/getSegmentUsage




//Get ElementUsageDefs Api /api/getElementUsageDefs


//Get Code Api /api/getCode


//Api for pdf generation



//Api for ediLog generation



//Api for drafts

