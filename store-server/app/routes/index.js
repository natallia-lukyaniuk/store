var ProductsRoutes = require('./products');

module.exports = (apiRoutes, app, db) => {
  ProductsRoutes(apiRoutes, app, db);
}