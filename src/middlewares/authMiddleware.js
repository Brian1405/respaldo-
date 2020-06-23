//Creamos la funcion middleware (los middlewares llevan  next)
function authMiddleware(req, res, next) {
    //Pregunatmos si alguien no esta en session 
    if (req.session.userId == undefined) {// unica forma q existe para saber si el  usuario se logeo
        //redirigimos 
        return res.redirect('/users/login')
    }
    next()
}
//exportamos
module.exports = authMiddleware




