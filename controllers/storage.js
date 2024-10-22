
const leadData = require('../data/leads.json')
const campaignData = require('../data/campaign.json')
const Lead = require('../models/lead')
const Campaign = require('../models/campaign')
const Report = require('../models/report')

exports.FetchData = async (req,res) => {
	try{
		return res.status(200).json({
			leads: leadData,
			campaign: campaignData
		})
	}
	catch(err){
		return res.status(500).json({
			success: false,
			msg: err.message
		})
	}
}

exports.SendDataToDb = async (req, res) => {
  try{
    let resLeadArray = [], resCampaignArray = [];

		// adding new campaign tuples in the db
		for(const campaign of campaignData) {

			if(campaign?.campaign_id && campaign?.budget && campaign?.name){
				const existingCampaign = await Campaign.findOne({campaignId: campaign.campaign_id});
				
				if(!existingCampaign){

					const newCampaign = new Campaign({
						campaignId: campaign.campaign_id,
						name: campaign.name,
						budget: campaign.budget
					})

					const res = await newCampaign.save()
					resCampaignArray.push(res);
				}
			}
		}

		// adding new leads tuples in the db
    for(const lead of leadData){
			const campaignID = await Campaign.findOne({campaignId: lead.campaign_id});

      if(campaignID && lead?.lead_id && lead?.customer_id && lead?.email_id) {
        let phone = lead?.phone || null;

        if(phone && phone >= 1000000000 && phone <= 9999999999) {
          phone = lead.phone;
        } 
				else {
          phone = null;
				}
				
        const existingLead = await Lead.findOne({
          campaignId: campaignID._id,
          leadId: lead.lead_id,
        });

        if (!existingLead) {
          const newLead = new Lead({
            leadId: lead.lead_id,
            campaignId: campaignID,
            status: lead.status,
            city: lead.city || 'NULL',
            customerId: lead.customer_id,
						convert: lead.convert,
            email: lead.email_id,
            contact: phone,
          });

          const result = await newLead.save();
          resLeadArray.push(result);
        }
      }
    }

    return res.status(200).json({
      success: true,
      leadData: resLeadArray,
			campaignData: resCampaignArray
    });
  } 
	catch(err){
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};


exports.ETLQuery = async (req, res) => {
	try{
		const response = await Lead.aggregate([
			{
				$match: {"convert" : 1}
			},
			{
				$group: {
					_id: {
						city: "$city",
						campaignId: "$campaignId"
					},
					count : { $sum : 1}
				}
			}
		])

		console.log(response);

		//update the db
		const reportPromises = response.map(async (entry) => {

			const existingReport = await Report.findOne(
				{
					campaignDetails: entry._id.campaignId,
					city: entry._id.city
				}
			);

			if(!existingReport) {
				const newReport = new Report({
					city: entry._id.city || "",
					campaignDetails: entry._id.campaignId || null,
					leadCount: entry.count || 0,
				});
			
				await newReport.save();
				console.log(newReport);
			}			

		});
		

		return res.status(200).json({
				success: true,
				data: response
		});
	} 
	catch (err) {
		return res.status(500).json({
				success: false,
				msg: err.message
		});
	}
};