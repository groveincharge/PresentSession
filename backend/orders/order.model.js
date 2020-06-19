const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	addedItems: {type: Array, required: true},
	total: {type: Number, required: true},
    orderDate: {
		type: Date,
		required: true,
		default: Date.now
	    }
});

//let Order = module.exports = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('Order', orderSchema);