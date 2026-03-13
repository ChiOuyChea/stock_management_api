class ProductResource {
  static toJSON(product) {
    return {
      id         : product._id,
      name       : product.name,
      quantity   : Number(product.quantity),
      price_in   : Number(product.price_in),
      price_out  : Number(product.price_out),
      description: product.description,
      image      : product.image
    };
  }

  static collection(products) {
    return products.map(product => this.toJSON(product));
  }
}

module.exports = ProductResource;