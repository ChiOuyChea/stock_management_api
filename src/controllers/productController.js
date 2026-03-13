const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductResource = require("../resources/productResource");

/**
 * Standard API response helper
 */
const response = (res, status, message, data = null) => {
    return res.status(status).json({
        success: status < 400,
        message,
        data
    });
};

/**
 * Validate MongoDB ObjectId
 */
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Validate Product Input
 */
const validateProduct = (data) => {
    const errors = [];

    if (!data.name || data.name.trim() === "") {
        errors.push("Name is required");
    }

    if (data.quantity !== undefined && data.quantity < 0) {
        errors.push("Quantity must be greater than or equal to 0");
    }

    if (data.price_in !== undefined && data.price_in < 0) {
        errors.push("price_in must be greater than or equal to 0");
    }

    if (data.price_out !== undefined && data.price_out < 0) {
        errors.push("price_out must be greater than or equal to 0");
    }

    return errors;
};

/**
 * @route   GET /products
 * @desc    Get list of products with optional search & pagination
 * @query   name, page, limit
 */
exports.index = async (req, res) => {
    try {
        const { name, page = 1, limit = 10 } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find(query)
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),

            Product.countDocuments(query)
        ]);

        return response(res, 200, "Products retrieved successfully", {
            items: ProductResource.collection(products),
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                total_pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        return response(res, 500, error.message);
    }
};

/**
 * @route   GET /products/:id
 * @desc    Get single product
 */
exports.show = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return response(res, 400, "Invalid product ID");
        }

        const product = await Product.findById(id);

        if (!product) {
            return response(res, 404, "Product not found");
        }

        return response(res, 200, "Product retrieved successfully", ProductResource.toJSON(product));

    } catch (error) {
        return response(res, 500, error.message);
    }
};

/**
 * @route   POST /products
 * @desc    Create a new product
 */
exports.store = async (req, res) => {
    try {
        const request = req.validated;

        const errors = validateProduct(request);

        if (errors.length) {
            return response(res, 422, "Validation failed", errors);
        }

        const productData = {
            name: request.name,
            quantity: request.quantity || 0,
            price_in: request.price_in || 0,
            price_out: request.price_out || 0,
            description: request.description || null,
            image: request.image || null
        };

        const product = await Product.create(productData);

        return response(
            res,
            201,
            "Product created successfully",
            ProductResource.toJSON(product)
        );

    } catch (error) {
        return response(res, 500, error.message);
    }
};

/**
 * @route   PUT /products/:id
 * @desc    Update a product
 */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const request = req.validated;

        if (!isValidObjectId(id)) {
            return response(res, 400, "Invalid product ID");
        }

        const errors = validateProduct(request);

        if (errors.length) {
            return response(res, 422, "Validation failed", errors);
        }

        const updateData = {
            name: request.name,
            quantity: request.quantity,
            price_in: request.price_in,
            price_out: request.price_out,
            description: request.description,
            image: request.image
        };

        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return response(res, 404, "Product not found");
        }

        return response(
            res,
            200,
            "Product updated successfully",
            ProductResource.toJSON(product)
        );

    } catch (error) {
        return response(res, 500, error.message);
    }
};

/**
 * @route   DELETE /products/:id
 * @desc    Delete a product
 */
exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return response(res, 400, "Invalid product ID");
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return response(res, 404, "Product not found");
        }

        return response(res, 200, "Product deleted successfully");

    } catch (error) {
        return response(res, 500, error.message);
    }
};