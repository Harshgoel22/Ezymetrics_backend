const Report = require('../models/report')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const mailSender  = require('../utils/mailSender')

exports.generatePDFReport = async (req,res)=>{
	try{
	    const report = await Report.find({}).populate('campaignDetails').exec();
        console.log(report);

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'leads.pdf');
        const writeStream = fs.createWriteStream(filePath);
        
        doc.pipe(writeStream);
        doc.fontSize(20).text('Convertion Report', { align: 'center' });
        doc.moveDown();

        report.forEach((lead) => {
            doc.fontSize(12).text(`CampaignID: ${lead.campaignDetails.campaignId}`);
            doc.text(`Campaign Name: ${lead.campaignDetails.name}`),
            doc.text(`City: ${lead.city}`);
            doc.text(`leadCount: ${lead.leadCount}`);
            doc.moveDown(); // Add space between entries

            doc.moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke();
            doc.moveDown();
        });
        doc.end();

        writeStream.on('finish', () => {
            console.log('PDF generated successfully: leads.pdf');
            res.download(filePath, 'leads.pdf', (err) => {
                if (err) {
                    console.error('Error downloading the file:', err);
                    return res.status(500).json({
                        success: false,
                        msg: 'Error downloading the file.'
                    });
                }
            });
        });

        writeStream.on('error', (err) => {
            console.error('Error writing the PDF file:', err);
            return res.status(500).json({
                success: false,
                msg: 'Error creating the PDF file.'
            });
        });

        //send email notification
        const {email} = req.body;
        await mailSender(email,'PDF DONE','<p>your pdf has been downloaded successfully</p>')
	}
	catch(err){
		return res.status(500).json({
			success: false,
			msg: err.message
		})
	}
}

exports.generateCSVReport = async (req, res) => {
  try {
    const reports = await Report.find().populate('campaignDetails').exec();

    const filePath = path.join(__dirname, 'leads.csv');

    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'campaignId', title: 'Campaign ID' },
        { id: 'campaignName', title: 'Name' },
        { id: 'city', title: 'City' },
        { id: 'leadCount', title: 'Lead Count' }
      ]
    });

    const records = reports.map((report) => ({
      campaignId: report.campaignDetails?.campaignId || '',
      campaignName: report.campaignDetails?.name || '',
      city: report.city || '',
      leadCount: report.leadCount || 0
    }));

    await csvWriter.writeRecords(records);
    console.log('CSV generated successfully: leads.csv');

    res.download(filePath, 'leads.csv', (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        return res.status(500).json({
          success: false,
          msg: 'Error downloading the file.'
        });
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting the CSV file:', unlinkErr);
        }
      });
    });
    const {email} = req.body;
    await mailSender(email,'CSV DONE','<p>your csv has been downloaded successfully</p>')
  } 
  catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};
