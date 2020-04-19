const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const productService = require('./product.service');

// routes
router.post('/addProduct', addProduct);
router.post('/upload', upload);
router.get('/getAll', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function upload(req, res, next) {
  // Upload Endpoint
  console.log('backend upload req.body',req.body)
  console.log('backend upload req.files',req.files)

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`c://Users/Grover/homefolder/workstation/PresentSession/frontend/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filePath: `/public/uploads/${file.name}` });
  });
}

function addProduct(req, res, next) {
console.log('backend addProduct req.body',req.body)
console.log('backend req.files',req.files)
 
    productService.addProduct(req.body)
        .then(() => res.json({
                      _id: mongoose.Schema.Types.ObjectId,
                 itemName: req.body.itemName,
                 itemPrice: req.body.itemPrice,
                 toFilePath: req.body.toFilePath
                }))
        .catch(err => next(err));
};

function getAll(req, res, next) {
  console.log('backend getAll req.body',req.body)
    productService.getAll()
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
    productService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}