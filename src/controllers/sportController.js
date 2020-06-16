const fs = require('fs')
const path = require('path');

//**Aca esta la conversion de la B.D a un objeto de JS */
let productsJson = path.join(__dirname,'../data/sportDataBase.json');
let arrayProducts = JSON.parse(fs.readFileSync(productsJson, 'utf-8')|| "[]");


const toThousand = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,"." );

const controller={
    home:(req,res)=> res.render('home',{arrayProducts,toThousand}),
    //res.send(arrayProducts),
    product:(req,res)=>res.render('listaDeProductos',{arrayProducts}),
    create:(req,res)=>res.render('createProducts'),

    created:(req,res)=>{
        let productCreado = {
            id:arrayProducts==""?1:arrayProducts.length+ 1,
            marca:req.body.marca,
            name: req.body.name,
            price: req.body.price,
            discount:req.body.discount,
            sport:req.body.sport,
            description:req.body.description,
            image:req.files[0].filename,
            
        }
          arrayProducts = [...arrayProducts,productCreado];
        fs.writeFileSync(productsJson,JSON.stringify(arrayProducts,null,""))
       res.redirect('/')

       console.log(productoCreado)
    },

    detail:(req,res)=>{
        let id = req.params.id;
        let productoEncontrado = arrayProducts.find(unProducto => {return id == unProducto.id});
        if(id == productoEncontrado.id){
            res.render('detail',{
                toThousand,
                idProducto:productoEncontrado.id,
                marcaProducto:productoEncontrado.marca,
                nombreProducto:productoEncontrado.name,
                descripcionProducto:productoEncontrado.description,
                precioProducto:toThousand(productoEncontrado.price),
                imagenProducto:productoEncontrado.image,
                descuentoProducto: productoEncontrado.discount,
                precioConDescuento:toThousand(productoEncontrado.price - (productoEncontrado.price * productoEncontrado.discount / 100))
            })
            }else{
                res.send('producto no esta añadido')
            }

    },
    edit:(req,res)=>{
    let id= req.params.id
    
    let productoEncontrado = arrayProducts.find(producto => {return producto.id == id})
    res.render('edit',{
        productoId:productoEncontrado.id,
        productoMarca:productoEncontrado.marca,
        productoNombre: productoEncontrado.name,
        productoPrecio:productoEncontrado.price, 
        productoDescuento:productoEncontrado.discount,
        productoDeporte:productoEncontrado.sport,
        productoDescripcion:productoEncontrado.description,

    })
    },
    edited:(req,res)=>{
        let id = req.params.id;
           
         arrayProducts.map((nuevoArray)=>{
              if(nuevoArray.id==id){
                  nuevoArray.name=req.body.name
                  nuevoArray.price=req.body.price
                  nuevoArray.discount=req.body.discount
                  nuevoArray.description=req.body.description
                  nuevoArray.sport=req.body.sport
                 
            }
          })
             fs.writeFileSync(productsJson,JSON.stringify(arrayProducts));
             res.redirect('/products')  
            
    },
    delete:(req,res)=>{
        let id = req.params.id;
        arrayProducts.splice(arrayProducts.indexOf(id))
        let deleteJson= JSON.stringify(arrayProducts)
        fs.writeFileSync(productsJson,deleteJson)
           res.redirect('/products')
       },
}
module.exports = controller;