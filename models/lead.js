const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
	{
		leadId : {
			type: Number,
			required: true,
			trim : true
		},
		campaignId: {
			type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Campaign",
		},
		status: {
			type: String,
			enum: ['New', 'Interested', 'Closed'],
			default: 'New',
			trim: true
		},
		convert: {
			type: Number,
			default: 0
		},
		city: {
			type: String,
			default: '',
			trim: true
		},
		customerId: {
			type: Number
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		contact: {
			type: Number
		}
	}
)

module.exports = mongoose.model('Lead',leadSchema)