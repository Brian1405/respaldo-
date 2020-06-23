const fs=require('fs');

function appMiddleware(req,res,next){
     fs.appendFileSync('logApp.txt','se ingreso en la pagina'+req.url)

     next();
}
module.exports=appMiddleware