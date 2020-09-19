'use strict'
const express = require("express")
const router = express.Router()

//User defined Routes
const agency 	= require('./routes/agency')
const version	= require('./routes/version')
const transactionSet		= require('./routes/transactionSet')
const segmentDescription	= require('./routes/segmentDescription')
const segmentUsage			= require('./routes/segmentUsage')
const elementUsageDefs		= require('./routes/elementUsageDefs')
const pdf		= require('./routes/pdf')
const ediLog	= require('./routes/ediLog')
const ediDraft	= require('./routes/ediDraft')
const report	= require('./routes/report')


 
// Agency APIs
router.post('/agency/get', agency.getAgency) 	
router.post('/agency/getAll', agency.getAllAgency)


// Version APIs
router.post('/version/get', version.getVersion)
router.post('/version/getAll', version.getAllVersion)


// TransactionSet APIs
router.post('/transactionSet/get', transactionSet.getTransactionSet)
router.post('/transactionSet/getAll', transactionSet.getAllTransactionSet)


// SegmentUsage APIs
router.post('/segmentUsage/get', segmentUsage.getSegmentUsage)
router.post('/segmentUsage/getFromPosition', segmentUsage.getSegmentUsageFromPosition)
router.post('/segmentUsage/getAll', segmentUsage.getAllSegmentUsage)	


// SegmentDescription APIs
router.post('/segmentDescription/get', segmentDescription.getSegmentDescription)


// ElementUsageDefs APIs
router.post('/elementUsageDefs/get', elementUsageDefs.getElementUsageDefs)
router.post('/elementUsageDefs/getFromPosition', elementUsageDefs.getElementUsageDefsFromPosition)
router.post('/elementUsageDefs/getWithCode', elementUsageDefs.getElementUsageDefsWithCode)
router.post('/elementUsageDefs/getMandatoryElementStatus', elementUsageDefs.getMandatoryElementStatus)
router.post('/code/get', elementUsageDefs.getCode)										


// PDF APIs
router.post('/pdf/create', pdf.getPdf)


// EdiLog APIs
router.post('/ediLog/create', ediLog.logEdiGuideCreation)
router.post('/ediLog/get', ediLog.getEdiGuideLog)
router.post('/ediLog/latestFileVersion', ediLog.getLatestVersion)


// EdiDraft APIs
router.post('/edi/saveAsDraft', ediDraft.createDraft)
router.post('/edi/getDraft', ediDraft.getDraft)


// Report APIs
router.post('/report/get', report.getReport)



module.exports = router