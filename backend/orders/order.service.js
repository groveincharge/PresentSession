const config = require('config.json');
const db = require('../_helpers/db');
const Order = db.Order;

module.exports = {
    addToCart,
    getAll,
    _delete,
    getById,
    update
  };

async function addToCart(orderList) {
    console.log('addToCart orderList.addedItems' ,orderList.addedItems)

    const items = new Order(orderList);
    console.log('backend order.service addToCart items ',items)

    // save order
    return await items.save()
    .then(docs => {
        return docs?{list: docs}: []
    })
    .catch(err => console.log(err))
  }

async function getAll() {
    return await Order.find()
    .exec()
    .then(docs => {
        return docs?{getproducts: docs}: []
    })
    .catch(err => console.log(err))
}

async function getById(_id) {
    return await Order.findById(_id);
}

async function update(_id, newOrder) {
    const order = await Order.findById(_id);

    // validate
    if (!order) throw 'Order not found';
    if (order._id !== newOrder._id && await Order.findOne({_id: newOrder._id })) {
        throw '_id "' + newOrder._id + '" Order _id found';
    }

    // copy userParam propertiesto user
    Object.assign(order, newOrder);

    await order.save();
}

async function _delete(_id) {
    await Order.findByIdAndRemove(_id);
}