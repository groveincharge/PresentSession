const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const orderService = require('./order.service');
const mongoose = require('mongoose');

// routes
router.post('/addToCart', addToCart);
router.get('/getAll', getAll);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function addToCart(req, res, next) {
console.log('backend addToCart req.body.addedItems)',req.body.addedItems)
console.log('backend addToCart req.body)',req.body)

    orderService.addToCart(req.body)
        .then(() => res.json({
                     addedItems: req.body.addedItems,
                     total: req.body.total
        }))
        .catch(err => next(err));
    };

function getAll(req, res, next) {
  console.log('backend getAll req.body',req.body)
    orderService.getAll()
        .then(getproducts => {
          console.log('backend getAll getproducts ',getproducts)
          res.json(getproducts)
        })
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params._id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    productService.update(req.params._id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params._id)
        .then(() => res.json({}))
        .catch(err => next(err));
}