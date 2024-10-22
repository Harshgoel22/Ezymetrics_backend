const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
	{
		campaignDetails: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Campaign"
		},
		leadCount: {
			type: Number,
			default: 0
		},
		city: {
			type: String,
			required: true,
			trim: true
		}
	}
)

module.exports = mongoose.model('Report',reportSchema);