module.exports = function(apiRoutes, app, db) {
  apiRoutes.get('/products', (req, res) => {
    db.query(
      "SELECT * from products",
      (err, products) => {
        res.send(products);
      }
    )
  });
}
