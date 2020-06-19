const config = require('config.json');
const db = require('../_helpers/db');
const Product = db.Product;

module.exports = {
    addProduct,
    getAll,
    _delete,
    getById,
    update
  };

async function addProduct(newProduct) {
    console.log('newProduct',newProduct)
    // validate
    if (await Product.findOne({itemName: newProduct.itemName})) {
        throw 'itemName "' + newProduct.itemName + '" is already taken';
    }

    const product = new Product(newProduct);
    console.log('backend product.service addProduct',newProduct)

    // save product
    await product.save();
  }

async function getAll() {
    return await Product.find()
    .exec()
    .then(docs => {
        return docs?{items: docs}: []
    })
    .catch(err => console.log(err))
}

async function getById(_id) {
    return await Product.findById(_id);
}

async function update(id, newProduct) {
    const product = await Product.findById(_id);

    // validate
    if (!product) throw 'Product not found';
    if (product.item !== newProduct.item && await User.findOne({item: newProduct.item })) {
        throw 'productName "' + newProduct.item + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(product, newProduct);

    await product.save();
}

async function _delete(_id) {
    await Product.findByIdAndRemove(_id);
}