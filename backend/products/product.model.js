const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
	itemName: {
		type: String,
		required:true,
		min: 2,
		max: 50
	},
	itemPrice: {
		type: Number,
		required:true,
		min: 2,
		max: 255
	},	
	toFilePath: {
		type: String,
		min: 2,
		max: 50
	},
	createdDate: {
		type: Date,
		required: true,
		default: Date.now
	    }
});

module.exports = mongoose.model('Product', schema);