//Creamos la funcion middleware
function cookieMiddleware (req,res,next){ 
    //preguntamos si hay una cookie o  si ya hay alguien en session
    if (req.session.userId||req.cookies.userCookie){
        req.session.userId= req.session.userId?req.session.userId:req.cookies.usercookie

    }
    next();
}
module.exports = cookieMiddleware 