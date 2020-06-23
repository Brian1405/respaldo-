const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt');
const { json } = require('express');
let { validationResult } = require('express-validator');
/*const usersJson = path.join(__dirname,'../data/usersDataBase.json');
    let arrayUsers =JSON.parse(fs.readFileSync(usersJson,'utf-8')|| "[]");
console.log(validationResult);*/

// Custom Functions 

let getAllUsers = () => {
    let usersJson = path.join(__dirname, '../data/usersDataBase.json');
    let arrayUsers = JSON.parse(fs.readFileSync(usersJson, 'utf-8') || "[]");
    return arrayUsers;
}

let getUserByEmail = (email) => {
    let allUsers = getAllUsers();
    let theUser = allUsers.find(oneUser => oneUser.email == email);
    return theUser;
}


const controller = {
    register: (req, res) => res.render('createUser'),

    store: (req, res, next) => {
        //EXPRESS-VALIDEITOR
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let newUser = {
                id: arrayUsers == "" ? 1 : arrayUsers.length + 1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.contraseña, 10),
                rcontraseña: bcrypt.hashSync(req.body.rcontraseña, 10),
                image: req.files[0].filename,
            }
            arrayUsers = [...arrayUsers, newUser];
            fs.writeFileSync(usersJson, JSON.stringify(arrayUsers, null, ""))
            res.redirect('/users/profile')
        } else {
            res.render('createUser', { errors: errors.errors })// errors es un objeto literal que tiene un array de error y solo mandamos un listado  de los  errores 
            //console.log(errors);
        }


    },
    login: (req, res) => res.render('login'),

    processLogin: (req, res) => {
        //Revisamos si hay errores 
        let validation = validationResult(req)
        let errors = validation.errors
        errors != '' ? res.render('login', { errors }) : ""

        //Traemos por mail al usuario que se quiere loguear 
        let userToLog = getUserByEmail(req.body.email);
        //console.log(userToLog);

        //Si lo encontramos 
        if (userToLog != undefined) {
            //Verificamos las contraseñas  y lo redireccionamos a/ profile
            if (bcrypt.compareSync(req.body.password, userToLog.password)) {
                //si las contraseñas coinciden Es el usuario 
                //Lo ponemos en session
                req.session.userId = userToLog.id
               

                 //si tildo recordame?
                 if(req.body.recordame){
                     res.cookie('userCookie',userToLog.id,{maxAge:100000})
                    
                     
                 }
                 res.redirect('/users/profile/' + userToLog.id);
              
            } else { res.send('Tus credenciales  son invalidas ') }
        } else {
            res.send('tu mail no esta en la base de datos o lo estas escribiendo mal media pila no estoy para juegos ojo')
        }
    },
    /* auth:(req,res)=> {
     
       let usuarioEncontrado = arrayUsers.find(user=> req.body.email== user.email )
       autorizado=bcrypt.compareSync(req.body.password,usuarioEncontrado.contraseña)
       autorizado?res.redirect('/users/profile'):res.render('login',{error:'credenciales invalidas'})
   },  */

    profile: (req, res) => {
        //Busacamos al usuario por su id 
        let user = getAllUsers().find(usuario => usuario.id == req.session.userId)
        //Renderizamos la vista  y le pasamos el usuario encontrado
        res.render('profile', { user })
    },
    logout:(req,res)=>{
        req.session.destroy()
        req.cookie('userCookie',null,{maxAge:1})
        res.redirect ('/')
    },


    check:(req,res)=>{
        if(req.cookies.userCookie==undefined){
            res.send('No estas logueado')
        } else {
            res.send ('El usuario logueado es :'+req.cookies.userCookie.email)
        }
       
    },
    sesion:(req,res)=>{
        if(req.session.userId ==undefined){
            res.send('No estas logueado')
        } 
            res.send ('El usuario logueado es: '+req.session.userId)
        }
       
    }

module.exports = controller;








































