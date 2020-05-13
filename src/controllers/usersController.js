const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')

let rutaJson = path.join (__dirname,'../data/usersDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(rutaJson ,'utf-8') || '[]');

let usersController = {
    register: ( req, res) => res.render('user-create-form'),
    guardar: ( req, res) => {
        let newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
        let newUserDB = [...usuarios, newUsers]
        fs.writeFileSync(rutaJson ,JSON.stringify(newUserDB, null, ' '))
        res.redirect('/user/login')
    },
    login: (req, res) => res.render('login'),
    auth: (req, res) => {
        let usuarioEncontrado = usuarios.find( usuario => req.body.email == usuario.email)
        let autorizado = bcrypt.compareSync(req.body.password, usuarioEncontrado.password)
        if (autorizado) {
            res.redirect('/usuario/profile')
        }
        else {
            res.redirect('/user/login')
        }
    }


};

module.exports = usersController;