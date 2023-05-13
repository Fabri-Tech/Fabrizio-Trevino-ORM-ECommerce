// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations
Product.belongsTo(Category);
Category.hasMany(Product);
Product.belongsToMany(Tag, { through: ProductTag });
Tag.belongsToMany(Product, { through: ProductTag });

// Update the association to use 'ProductTag' instead of 'ProductTagModel'
ProductTag.belongsTo(Product);
ProductTag.belongsTo(Tag);
Product.hasMany(ProductTag);
Tag.hasMany(ProductTag);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
