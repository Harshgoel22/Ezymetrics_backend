const mongoose = require('mongoose')

const campaignSchema = new mongoose.Schema(
	{
		campaignId: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		budget: {
			type: Number,
			required: true
		}
	}
)

module.exports = mongoose.model('Campaign',campaignSchema)