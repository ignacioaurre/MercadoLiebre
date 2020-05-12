const fs = require('fs')
const path = require('path')

let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));

let mainController = {
    home: function(req, res, next) {
        res.render('index', { 'productos':productos });
      },
      ofertas: function (req, res) {
        res.render('ofertasIndex', {productos})
      } 
    };



module.exports = mainController;