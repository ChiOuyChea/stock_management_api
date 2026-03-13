const express = require('express')
const { index, show, store, update, destroy } = require('../../controllers/productController')
const validateRequest = require('../../middlewares/validateRequest')
const { storeProductRequest, updateProductRequest } = require('../../requests/productRequest')
const router = express.Router();

router.get('/', index)
router.get('/:id', show)
router.put('/:id', update, validateRequest(updateProductRequest))
router.post('/', store, validateRequest(storeProductRequest))
router.delete('/:id', destroy)

module.exports = router