const fs = require('fs')
const path = require('path')
const bcrypt=require('bcrypt');
const { json } = require('express');//hacer un console .log
/**Aca esta la conversion de la B.D a un objeto de JS */
let usersJson = path.join(__dirname,'../data/usersDataBase.json');
let arrayUsers =JSON.parse(fs.readFileSync(usersJson,'utf-8')|| "[]");


 const controller ={
    register:(req,res)=> res.render('createUser'),
         
    store:(req, res,next) =>{
        let newUser = {
            id:arrayUsers==""?1:arrayUsers.length+ 1,
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            email: req.body.email,
            password:bcrypt.hashSync(req.body.contraseña,10),
            rcontraseña:bcrypt.hashSync(req.body.rcontraseña,10), 
            image:req.files[0].filename,
            
            
        } 
         
        
        arrayUsers = [...arrayUsers,newUser];
        fs.writeFileSync(usersJson,JSON.stringify(arrayUsers,null,""))
        res.redirect('/users/profile')
 
             
        
    },
    login: (req,res)=> res.render('login'),  
     
   /* auth:(req,res)=> {
      
        let usuarioEncontrado = arrayUsers.find(user=> req.body.email== user.email )
        autorizado=bcrypt.compareSync(req.body.password,usuarioEncontrado.contraseña)
        autorizado?res.redirect('/users/profile'):res.render('login',{error:'credenciales invalidas'})
    },  */

    profile:(req,res) => res.render('profile')
    
}  
module.exports = controller;
  
  

       
        
          
        
        
        
        

    
   
         


    
           
        
            
         
        
        

   
        
    
           
    
      




    





