var pdfkit = require('pdfkit');


exports.getPdf = function(req,res){
	var params=req.body;
	// console.log(params);
	var fs=require('fs');
	var filePath='';
	var x;	
	var transactionSet=params.transactionSet;
	var version=params.version;
	var transactionDescription=params.transactionDescription;
	var headingText=params.headingText;	
	var footerText=params.footerText;
	footerText=footerText.split('$');
	var businessPartnerText=params.businessPartnerText	;
	var numberOfHeadingSegments=params.numberOfHeadingSegments;
	var numberOfDetailSegments=params.numberOfDetailSegments;
	var numberOfSummarySegments=params.numberOfSummarySegments;
	var presentLoop='';

	// params.segmentUsage=params.segmentUsage.substring(1,params.segmentUsage.length-1);
	console.log(params.segmentUsage);
	
	var segmentUsage=JSON.parse(params.segmentUsage);
	var numberOfElementsInSegment=JSON.parse(params.numberOfElementsInSegment);
	var elementUsageDefs=JSON.parse(params.elementUsageDefs);
	var segmentText=JSON.parse(params.segmentText);
	var elementCode=JSON.parse(params.code);
		
	var doc=new pdfkit({	
		size: 'a4',
		layout: 'portrait',
		margin : 50,
		bufferPages: true
	});
	var y,z,a;
	var tempElementCode=elementCode;

	var fileName=businessPartnerText+'_'+transactionSet+'_'+version+'.pdf';

	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename='+fileName);
	

	filePath=__dirname+'/../EDIFiles/pdf/'+fileName;

	for(x in tempElementCode)
	{
		for(y in tempElementCode[x])
		{
			for(z in tempElementCode[x][y])
			{
				console.log(tempElementCode[x][y][z]);
			}
		}
	}

	for(y in segmentText)
	{
		segmentText[y]=segmentText[y].split('$');
	}

	fs.open(filePath,'w+',function(err,fd){

		if(!err)
		{
			doc.pipe(fs.createWriteStream(filePath));
			doc.pipe(res);
		//	doc.addPage();

//HEADING PART /////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			console.log('heading');

var maxx=0;

			//TransactionSet and Version
			doc.font('Helvetica-Bold');
			doc.fontSize(20);
			doc.text(transactionSet,{lineBreak:false});			
			if(doc.x>maxx)
			{
				maxx=doc.x;
			}

			doc.moveDown();			
			doc.fontSize(10);
			doc.fillColor('red');
			doc.text('VER.'+version,50,doc.y,{lineBreak:false});
			if(doc.x>maxx)
			{
				maxx=doc.x;
			}
			doc.font('Helvetica');

			//Heading line definition
			doc.lineWidth(2.5);
			doc.moveTo(maxx+5,50).lineTo(550,50).stroke();
			
			//Transaction Description
			doc.fillColor('black');
			doc.fontSize(20);
			doc.font('Helvetica-Bold');
			doc.text(transactionDescription,maxx+7,57,{lineBreak:true});
			doc.lineWidth(2.5);
			doc.moveTo(doc.x,doc.y).lineTo(550,doc.y).stroke();
			

//END HEADING PART//////////////////////////////////////////////////////////////////////////////////////////////////
			
//SUMMARY OF SEGMENTS //////////////////////////////////////////////////////////////////////////////////////////////			

			console.log('segmentsummary');
			
			doc.fillColor('black');
			doc.font('Helvetica');
			doc.fontSize(10);
			doc.text(headingText,50,doc.y+20,{lineBreak:true});

			if(numberOfHeadingSegments>0)
			{

				//Heading table heading
				doc.moveDown(2);
				doc.fontSize(15);
				doc.font('Helvetica-BoldOblique');
				doc.text('Heading',{underline:true});

				doc.moveDown(1);
				doc.fontSize(10);
				doc.font('Helvetica-Bold');
				doc.text('POS',{underline:true,indent:5});
				doc.moveUp(1);
				doc.text('ID',{underline:true,indent:45});
				doc.moveUp(1);
				doc.text('Segment Name',{underline:true,indent:85});
				doc.moveUp(1);
				doc.text('Req',{underline:true,indent:320});
				doc.moveUp(1);
				doc.text('Max Use',{underline:true,indent:355});
				doc.moveUp(1);
				doc.text('Repeat',{underline:true,indent:410});
				doc.moveUp(1);
				doc.text('Notes',{underline:true,indent:460});
				
				doc.fontSize(10);						
				doc.fillColor('#757575');

				for(x in segmentUsage)
				{
					if(segmentUsage[x]['Section']=='H')
					{					
						if(segmentUsage[x]['LoopID']!=''&&presentLoop!=segmentUsage[x]['LoopID'])
						{
							doc.rect(doc.x-3,doc.y+4,503,20).fillAndStroke('#0d47a1','#0d47a1');
							presentLoop=segmentUsage[x]['LoopID']

							doc.moveDown(1);
							doc.fillColor('white');
							doc.font('Helvetica-Bold');
							doc.text('Segment Group '+segmentUsage[x]['LoopID']+'_'+segmentUsage[x]['SegmentID'],{indent:5});
							doc.moveUp(1);
							doc.text('',{indent:45});
							doc.moveUp(1);
							doc.text(' ',{indent:85});
							doc.moveUp(1);
							doc.text(' ',{indent:333});
							doc.moveUp(1);
							doc.text(' ',{indent:368});
							// doc.moveUp(1);
							doc.text(segmentUsage[x]['MaximumLoopRepeat'],{indent:423,underline:true});
							doc.moveUp(1);
							doc.text(' ',{indent:473});
							doc.fillColor('#757575');	
						}
						
						doc.moveDown(1);
						doc.font('Helvetica');
						doc.text((segmentUsage[x]['Position']=='')?' ':segmentUsage[x]['Position'],{indent:5});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentID']=='')?' ':segmentUsage[x]['SegmentID'],{indent:45});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentDescription']=='')?' ':segmentUsage[x]['Description'],{indent:85});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['RequirementDesignator']=='')?' ':segmentUsage[x]['RequirementDesignator'],{indent:323});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['MaximumUsage']=='')?' ':segmentUsage[x]['MaximumUsage'],{indent:358});
						doc.moveUp(1);
						doc.text(' ',{indent:413});
						doc.moveUp(1);
						doc.text(' ',{indent:463});
						//doc.moveDown(1);						
					}
				}
			}

			if(doc.y>600)
			{
				doc.addPage();
			}

			if(numberOfDetailSegments>0)
			{

				//Heading table heading
				doc.moveDown(3);
				doc.fontSize(15);
				doc.fillColor('black');
				doc.font('Helvetica-BoldOblique');
				doc.text('Detail',{underline:true});

				doc.moveDown(1);
				doc.fontSize(10);
				doc.font('Helvetica-Bold');
				doc.text('POS',{underline:true,indent:5});
				doc.moveUp(1);
				doc.text('ID',{underline:true,indent:45});
				doc.moveUp(1);
				doc.text('Segment Name',{underline:true,indent:85});
				doc.moveUp(1);
				doc.text('Req',{underline:true,indent:320});
				doc.moveUp(1);
				doc.text('Max Use',{underline:true,indent:355});
				doc.moveUp(1);
				doc.text('Repeat',{underline:true,indent:410});
				doc.moveUp(1);
				doc.text('Notes',{underline:true,indent:460});
				
				doc.fontSize(10);						
				doc.fillColor('#757575');

				for(x in segmentUsage)
				{
					if(segmentUsage[x]['Section']=='D')
					{										
						if(segmentUsage[x]['LoopID']!=''&&presentLoop!=segmentUsage[x]['LoopID'])
						{
							doc.rect(doc.x-3,doc.y+4,503,20).fillAndStroke('#0d47a1','#0d47a1');
							presentLoop=segmentUsage[x]['LoopID']

							doc.moveDown(1);
							doc.fillColor('white');
							doc.font('Helvetica-Bold');
							doc.text('Segment Group '+segmentUsage[x]['LoopID']+'_'+segmentUsage[x]['SegmentID'],{indent:5});
							doc.moveUp(1);
							doc.text('',{indent:45});
							doc.moveUp(1);
							doc.text(' ',{indent:85});
							doc.moveUp(1);
							doc.text(' ',{indent:333});
							doc.moveUp(1);
							doc.text(' ',{indent:368});
							// doc.moveUp(1);
							doc.text(segmentUsage[x]['MaximumLoopRepeat'],{indent:423,underline:true});
							doc.moveUp(1);
							doc.text(' ',{indent:473});
							doc.fillColor('#757575');	
						}
						doc.moveDown(1);
						doc.font('Helvetica');
						doc.text((segmentUsage[x]['Position']=='')?' ':segmentUsage[x]['Position'],{indent:5});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentID']=='')?' ':segmentUsage[x]['SegmentID'],{indent:45});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentDescription']=='')?' ':segmentUsage[x]['Description'],{indent:85});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['RequirementDesignator']=='')?' ':segmentUsage[x]['RequirementDesignator'],{indent:323});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['MaximumUsage']=='')?' ':segmentUsage[x]['MaximumUsage'],{indent:358});
						doc.moveUp(1);
						doc.text(' ',{indent:413});
						doc.moveUp(1);
						doc.text(' ',{indent:463});
						//doc.moveDown(1);						
					}
				}				
			}

			if(doc.y>600)
			{
				doc.addPage();
			}

			if(numberOfSummarySegments>0)
			{

				//Heading table heading
				doc.moveDown(3);
				doc.fontSize(15);
				doc.fillColor('black');
				doc.font('Helvetica-BoldOblique');
				doc.text('Summary',{underline:true});

				doc.moveDown(1);
				doc.fontSize(10);
				doc.font('Helvetica-Bold');
				doc.text('POS',{underline:true,indent:5});
				doc.moveUp(1);
				doc.text('ID',{underline:true,indent:45});
				doc.moveUp(1);
				doc.text('Segment Name',{underline:true,indent:85});
				doc.moveUp(1);
				doc.text('Req',{underline:true,indent:320});
				doc.moveUp(1);
				doc.text('Max Use',{underline:true,indent:355});
				doc.moveUp(1);
				doc.text('Repeat',{underline:true,indent:410});
				doc.moveUp(1);
				doc.text('Notes',{underline:true,indent:460});
				
				doc.fontSize(10);						
				doc.fillColor('#757575');

				for(x in segmentUsage)
				{
					if(segmentUsage[x]['Section']=='S')
					{										
						if(segmentUsage[x]['LoopID']!=''&&presentLoop!=segmentUsage[x]['LoopID'])
						{
							doc.rect(doc.x-3,doc.y+4,503,20).fillAndStroke('#0d47a1','#0d47a1');
							presentLoop=segmentUsage[x]['LoopID']

							doc.moveDown(1);
							doc.fillColor('white');
							doc.font('Helvetica-Bold');
							doc.text('Segment Group '+segmentUsage[x]['LoopID']+'_'+segmentUsage[x]['SegmentID'],{indent:5});
							doc.moveUp(1);
							doc.text('',{indent:45});
							doc.moveUp(1);
							doc.text(' ',{indent:85});
							doc.moveUp(1);
							doc.text(' ',{indent:333});
							doc.moveUp(1);
							doc.text(' ',{indent:368});
							// doc.moveUp(1);
							doc.text(segmentUsage[x]['MaximumLoopRepeat'],{indent:423,underline:true});
							doc.moveUp(1);
							doc.text(' ',{indent:473});
							doc.fillColor('#757575');	
						}
						doc.moveDown(1);
						doc.font('Helvetica');
						doc.text((segmentUsage[x]['Position']=='')?' ':segmentUsage[x]['Position'],{indent:5});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentID']=='')?' ':segmentUsage[x]['SegmentID'],{indent:45});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['SegmentDescription']=='')?' ':segmentUsage[x]['Description'],{indent:85});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['RequirementDesignator']=='')?' ':segmentUsage[x]['RequirementDesignator'],{indent:323});
						doc.moveUp(1);
						doc.text((segmentUsage[x]['MaximumUsage']=='')?' ':segmentUsage[x]['MaximumUsage'],{indent:358});
						doc.moveUp(1);
						doc.text(' ',{indent:413});
						doc.moveUp(1);
						doc.text(' ',{indent:463});
						//doc.moveDown(1);						
					}
				}				
			}

// END OF SUMMARY OF SEGMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////

// // Footer Part ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 			if(doc.y>750&&footerText.length>1)
// 			{
// 				doc.addPage();
// 			}

// 			for(x in footerText)
// 			{
// 				if(x%2!=0)
// 				{
// 					doc.moveDown(2);
// 					doc.font('Helvetica-Bold');
// 					doc.text(footerText[x],{lineBreak:true,underline:true});
// 				}
// 				else
// 				{
// 					doc.font('Helvetica');
// 					doc.text(footerText[x],{lineBreak:true});
// 				}
// 			}

// 			//Heading text
// 			//doc.fillColor('black');
			
// //End of footer part////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Element Summary With Segments ///////////////////////////////////////////////////////////////////////////////////////////////////
			
			console.log('Elemet Summary');

			doc.moveDown(1);
			for(x in segmentUsage)
			{
				//Title
				doc.addPage();
				doc.fillColor('black');
				doc.font('Helvetica-Bold');
				doc.fontSize(35);
				doc.text(segmentUsage[x]['SegmentID'],{lineBreak:false});
				
				//Line Graphics of each page
				doc.lineWidth(1);
				var g=doc.x+10;			
				doc.moveTo(doc.x+10,doc.y-5).lineTo(550,doc.y-5).stroke('#0d47a1');
				doc.rect(400,doc.y-5,150,40).stroke();

				doc.fontSize(12);
				doc.text("    "+segmentUsage[x]['Description'],{columns:1,width:300});
				doc.moveUp(1);

				//Side Summary Box
				doc.font('Courier');
				doc.fontSize(10);				
				doc.text('POS: '+segmentUsage[x]['Position'],405,doc.y);
				doc.moveUp(1);
				doc.text('Max: '+segmentUsage[x]['MaximumUsage'],{align:'right'});
				doc.text(((segmentUsage[x]['Section']=='H')?'Heading':'')+((segmentUsage[x]['Section']=='D')?'Detail':'')+((segmentUsage[x]['Section']=='S')?'Summary':'')+" - "+((segmentUsage['RequirementDesignator']=='M')?'Mandatory':'Optional'),425,doc.y);
				doc.text('Loop: '+((segmentUsage[x]['LoopID']=="")?'N/A':segmentUsage[x]['LoopID']),405,doc.y);
				doc.moveUp(1);
				doc.text('Elements: '+numberOfElementsInSegment[segmentUsage[x]['Position']],{align:'right'});			
				
				//Table Heading
				doc.font('Helvetica-BoldOblique');
				doc.fontSize(15);
				doc.text('Element Summary',55,120,{underline:true});
				
				//Table Body
				doc.moveDown(1);
				doc.fontSize(10);
				doc.font('Helvetica-Bold');
				doc.text('Ref',{underline:true,indent:5});
				doc.moveUp(1);
				doc.text('ID',{underline:true,indent:43});
				doc.moveUp(1);
				doc.text('Segment Name',{underline:true,indent:75});
				doc.moveUp(1);
				doc.text('Req',{underline:true,indent:320});
				doc.moveUp(1);
				doc.text('Type',{underline:true,indent:355});
				doc.moveUp(1);
				doc.text('Min/Max',{underline:true,indent:410});
				doc.moveUp(1);
				doc.text('Notes',{underline:true,indent:460});

				for(y in elementUsageDefs[segmentUsage[x]['Position']])
				{
					doc.fillColor('#757575');															
					doc.moveDown(1);
					doc.font('Helvetica');
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['SegmentID']+elementUsageDefs[segmentUsage[x]['Position']][y]['Position'],{indent:5});
					doc.moveUp(1);
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['ElementID'],{indent:43});
					doc.moveUp(1);
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['Description'],{indent:75});
					doc.moveUp(1);
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['RequirementDesignator'],{indent:323});
					doc.moveUp(1);
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['Type'],{indent:358});
					doc.moveUp(1);
					doc.text(elementUsageDefs[segmentUsage[x]['Position']][y]['MinimumLength']+'/'+elementUsageDefs[segmentUsage[x]['Position']][y]['MaximumLength'],{indent:413});
					doc.moveUp(1);
					doc.text(' ',{indent:463});

					if(elementCode[segmentUsage[x]['Position']]!=undefined&&elementCode[segmentUsage[x]['Position']][elementUsageDefs[segmentUsage[x]['Position']][y]['Position']]!=undefined)
					{
						doc.moveDown(2);
						doc.font('Helvetica-Bold');
						doc.moveUp(1);
						doc.text('Code',{underline:true,indent:90});
						doc.moveUp(1);
						doc.text('Name',{underline:true,indent:140});
						doc.font('Helvetica');

						for(a in elementCode[segmentUsage[x]['Position']][elementUsageDefs[segmentUsage[x]['Position']][y]['Position']])
						{	
							doc.text(elementCode[segmentUsage[x]['Position']][elementUsageDefs[segmentUsage[x]['Position']][y]['Position']][a]['value'],{indent:90,lineGap:2});
							doc.moveUp(1);
							doc.text(elementCode[segmentUsage[x]['Position']][elementUsageDefs[segmentUsage[x]['Position']][y]['Position']][a]['description'],{indent:140,lineGap:2});
						//	doc.moveDown(1);							
						}
					}

				//	doc.moveDown(1);										
				}

				//Segment ElementSummary Footer

				for(z in segmentText[segmentUsage[x]['Position']])
				{
					if(z%2!=0)
					{
						doc.moveDown(2);
						doc.font('Helvetica-Bold');
						doc.text(segmentText[segmentUsage[x]['Position']][z],{lineBreak:true,underline:true});
					}
					else
					{
						doc.font('Helvetica');
						doc.text(segmentText[segmentUsage[x]['Position']][z],{lineBreak:true});
					}
				}

				// for(z in segmentText[segmentUsage[x]['Position']])
				// {
				// 	if(z%2!=0)
				// 	{
				// 		doc.moveDown(2);
				// 		doc.font('Helvetica-Bold');
				// 		doc.text(segmentText[segmentUsage[x]['Position']][z],{lineBreak:true,underline:true});
				// 	}
				// 	else
				// 	{
				// 		doc.font('Helvetica');
				// 		doc.text(segmentText[segmentUsage[x]['Position']][z],{lineBreak:true});
				// 	}
				// }
			}			

//End element summary with segments ///////////////////////////////////////////////////////////////////////////////////////////////
	

// Footer Part ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			console.log('finalfooter');

			doc.addPage();

			for(x in footerText)
			{
				if(x%2!=0)
				{
					doc.moveDown(2);
					doc.font('Helvetica-Bold');
					doc.text(footerText[x],{lineBreak:true,underline:true});
				}
				else
				{
					doc.font('Helvetica');
					doc.text(footerText[x],{lineBreak:true});
				}
			}

			//Heading text
			//doc.fillColor('black');
			
//End of footer part////////////////////////////////////////////////////////////////////////////////////////////////////////////////



			// Add header and footer data

			console.log('page headers');

			var range = doc.bufferedPageRange();
			var i;
			for(i=range.start;i<(range.start+range.count);i++)
			{
			  doc.switchToPage(i);
			  //doc.font('Helvetica-Bold');
			  doc.fontSize(12);
			  doc.text(businessPartnerText,10,10);
			}

			console.log('end');

			// # finalize the PDF and end the stream
			doc.end()			

			fs.unlink(filePath, (err) => {
			  if (err){
			  	console.log('Error deleting '+filePath);
			  }
			  else
			  {
			  	console.log('successfully deleted '+filePath);
			  }
			});

		}
		else
		{
			console.log(err);
			res.send('Error');
		}
		
	});
}