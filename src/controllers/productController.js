const fs = require('fs')
const path = require('path')

let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));




let productController = {
    detail: function(req, res) {
        let producto = req.params.idProduct
        let productId = productos.find ( ({id}) => id == producto);
        if (productId == undefined ){
                res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('detail', {productId})
        }
      },
      pruebas: function(req, res){
        res.render('pruebas', {productos})
      }, 
      products: function (req, res){
        res.render('products', {productos})
      },
      create: function (req,res,next) {
        res.render('product-create-form', {productos})
      },
      guardar: function (req, res, next) {
        let productoNuevo = {
          id: productos[productos.length - 1].id + 1,
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          discount: req.body.discount,
          category: req.body.category,
          image: req.files[0].filename
        }
        productos.push(productoNuevo)
        fs.writeFileSync(rutaJson ,JSON.stringify(productos, null, ' '))
        res.redirect('/products')
      },
      editar: function (req, res) {
        let producto = req.params.idProduct
        let productId = productos.find ( ({id}) => id == producto);
        if (productId == undefined ){
                res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('product-edit-form', {productId})
        }
      },
      editado: function (req, res) {
        let productId = req.params.idProduct;
        productos.forEach(productoCambiado => {
          if ( productoCambiado.id == productId){
              productoCambiado.name = req.body.name,
              productoCambiado.description = req.body.description,
              productoCambiado.price = req.body.price,
              productoCambiado.discount = req.body.discount,
              productoCambiado.category = req.body.category
        }});
        fs.writeFileSync(rutaJson ,JSON.stringify(productos, null,' '))
        res.redirect('/products/detail/' + productId)
       },
       delete: function (req, res) {
         let producto = req.params.idProduct;
         let productId = productos.find ( ({id}) => id == producto);
         let posicion = productos.indexOf(productId);
         productos.splice(posicion, 1);
         fs.writeFileSync(rutaJson ,JSON.stringify(productos, null,' '))
         res.redirect('/products')
       }
    };



module.exports = productController;