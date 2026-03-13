const express = require('express')
const { index, show, store, update, destroy } = require('../../controllers/productController')
const validateRequest = require('../../middlewares/validateRequest')
const { storeProductRequest, updateProductRequest } = require('../../requests/productRequest')
const router = express.Router();

router.get('/', index)
router.get('/:id', show)
router.put('/:id', validateRequest(updateProductRequest), update)
router.post('/', validateRequest(storeProductRequest), store)
router.delete('/:id', destroy)

module.exports = router