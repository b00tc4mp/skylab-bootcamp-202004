
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
const retrieveDelivery= require("./retrieve-delivery")
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const {utils:{Rounder:{round}}}= require("facturator-commons")
require("facturator-commons/polyfills/string")

module.exports= function(deliveryId){
  String.validate.notVoid(deliveryId)
  return retrieveDelivery(deliveryId)
  .then(delivery=>{

    //Recibe el albaran
    if(typeof delivery!=="object") throw new TypeError(delivery+" is not an object")
    const{client,products}= delivery
    const productQuantity=[[ 'Producto', 'Descripción',"Cantidad","Precio","Total"]]
    let totalPayment=0
    for(let i=0; i<products.length;i++){
      productQuantity.push([products[i].product.name,products[i].product.description, products[i].quantity,products[i].product.price,round(products[i].quantity*products[i].product.price,2)])
    }
    for(j=1;j<productQuantity.length;j++){
      totalPayment+=productQuantity[j][4]
    }
    productQuantity.push(["Total","","","",totalPayment])
    //Comprueba que es el albaran

    //Rellena la info del cliente
    var docDefinition = {
        content: [
            {
              //Client info
                layout: 'lightHorizontalLines', // optional
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 0,
                  widths: [ 'auto','auto' ],
          
                  body: [
                    [ 'Nombre', `${client.name}`],
                    [ 'Empresa', `${client.establishment ? client.establishment : " "}`],
                    [ 'Direccion', `${client.direction ? client.direction : " "}`],
                    [ 'Teléfono', `${client.contactNumber ? client.contactNumber : " "}`],
                    [ 'Email', `${client.email ? client.email : " "}`],
                    [ "Fecha",new Date().toJSON().slice(0,10).replace(/-/g,'/').toString()]
                  ]
                }
              },{
                text: "\n \n \n"
              },{
                layout: 'lightHorizontalLines', // optional
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ 'auto',"*",'auto',"auto","auto" ],
          
                  body: productQuantity
                }
              }
        ]
    }

    //Hace una tabla con el producto y la cantidad

    //Rellena la info con el coste total, los impuestos y si se ha pagado 

    //Crea el pdf

    pdfMake.createPdf(docDefinition).download()
    
  })
  .catch(error=>{
    console.log(error)
  })
}