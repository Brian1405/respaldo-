const fs=require('fs');

function rutasMiddleware(req,res,next){
     fs.appendFileSync('logRutas.txt','Ingreso:'+req.url)

     next();
}
module.exports=rutasMiddleware
