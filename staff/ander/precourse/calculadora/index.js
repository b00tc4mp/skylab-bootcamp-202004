"use strick"
//ANDER MARTIN CALCULATOR
var resultSum =0;
var resultRest =0;
var resultMult =0;
var resultDiv =0;
var resultRaiz =0;
var resultArray=[];

num1=prompt("Escriba su primer numero:",);
num2=prompt("Escriba su segundo numero:",);

//console.log(typeof(num2));
//console.log(num2.length);

while (isNaN(num1) || isNaN(num2)){ //solo salimos si son numeros o el segundo esta vacio.
  
   if(num2.length==0){
      
      break;
    }
  alert("Solo valen numeros!"); 
  num1=prompt("Escriba su primer numero:",);
  num2=prompt("Escriba su segundo numero:",);
      
}
  
if(num2.length==0){ //si el segundo prompt esta vacio...
    resultRaiz=Math.sqrt(num1);
      if (resultRaiz%1==0){  //si el numero es entero...
        console.log("La raiz cuadradra de ", num1, "es :",resultRaiz);
      }else{
         console.log("La raiz cuadradra de ", num1, "es :",resultRaiz.toFixed(3));
    }
   
} else{
    suma(num1,num2);
    resta(num1,num2);
    multi(num1,num2);
    divi(num1,num2);

    for (i in resultArray) {
      console.log(resultArray[i]);
    }



//FUNCIONES
}
function suma(numer1,numer2) {
  resultSum=(parseFloat(numer1)+parseFloat(numer2));
  resultArray.push("La suma es:", resultSum);
    
}
function resta(numer1,numer2) {
    resultRest=(parseFloat(numer1)-parseFloat(numer2));  
    resultArray.push("La resta es:", resultRest); 
  }
  function multi(numer1,numer2) {
    resultMult=(parseFloat(numer1)*parseFloat(numer2));  
    resultArray.push("La multiplicacion es:", resultMult);
  }
  function divi(numer1,numer2) {
    
     resultDiv= parseFloat(numer1)/parseFloat(numer2); 
     resultArray.push("La division es:",resultDiv.toFixed(3));
  }


