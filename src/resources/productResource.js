class ProductResource {
  static toJSON(product) {
    return {
      id         : product._id,
      name       : product.name,
      quantity   : Number(product.quantity),
      price_in   : Number(product.price),
      price_out  : Number(product.price),
      description: product.description,
      image      : product.image
    };
  }

  static collection(products) {
    return products.map(product => this.toJSON(product));
  }
}

module.exports = ProductResource;