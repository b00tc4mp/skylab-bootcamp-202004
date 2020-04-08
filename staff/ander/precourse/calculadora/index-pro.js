"use strick"
//ANDER MARTIN CALCULATOR
var fullArray=[];
var resultArray=[];
var resultSum =0;
var resultRest =0;
var resultMult =1;
var resultDiv =0;
var resultRaiz =0;
var arrayFunc=[];
var n=0;
var cont=1;

calcpro();
console.log(fullArray);
    for (var i = 0; i < fullArray.length; i++) {
      for(var x = 0; x < fullArray[i].length; x++){
      console.log(fullArray[i][x]);
   }
    }

function calcpro(){ //Funcion principal

var num1= prompt("Escriba su "+(n+1)+"º numero: (n para parar!)");
 while (num1!="n"){ 

  while (isNaN(num1) || num1==""){ 
    alert("Solo valen numeros!"); 
    num1=prompt("Escriba su "+(n+1)+"º numero: (n para parar!)");
  }
  arrayFunc.push(parseFloat(num1));
  n++;
  num1= prompt("Escriba su "+(n+1)+"º numero: (n para parar!)");

  }
  

if(arrayFunc.length==1){ 
    resultArray.push(cont + " - OPERACION :");
    raiz();
   
} else{
    resultArray.push(cont + " - OPERACION :");
    suma(...arrayFunc); // sin los ...  lee el array como una sola posicion y no lo recorre.
    resta(...arrayFunc);
    multi(...arrayFunc);
    divi(...arrayFunc);
}
    fullArray.push(resultArray);
    //Linea añadida
    for (var index = 0; index < resultArray.length; index++) {
       console.log(resultArray[index]);
      
    }
    var resp=prompt("Deseas realizar otra operacion?(s/n)",);
    if (resp.toUpperCase()=="S"){
      cont++;
      resultSum =0;
      resultRest =0;
      resultMult =1;
      resultDiv =0;
      resultRaiz =0;
      arrayFunc=[];
      resultArray=[];
      n=0;
      calcpro();
    
}
}
    

//FUNCIONES OPERAR

function suma() {
  
  for (numero in arguments){
    
    resultSum+=arguments[numero];
    
  }
  resultArray.push("La suma es: " + resultSum);
    
}

function resta() {
  resultRest=arguments[0];
  
  for (var i=1;i < arguments.length;i++){
    
    resultRest-=arguments[i];
    
  }
  resultArray.push("La resta es: " + resultRest);
    
}

function multi() {
  
  for (numero in arguments){
    
    resultMult=resultMult * arguments[numero];
    
  }
  resultArray.push("La multiplicacion  es: " + resultMult);
    
}

function divi() {
  resultDiv=arguments[0];
  for (var i=1;i < arguments.length;i++){
    
    resultDiv/=arguments[i];
  }
  resultArray.push("La division es: " + resultDiv.toFixed(3));
    
}

function raiz(){
  resultRaiz=Math.sqrt(arrayFunc[0]);
  if (resultRaiz%1==0){  //si el numero es entero...
    resultArray.push("La raiz cuadradra de "+arrayFunc+ " es : "+resultRaiz);
  }else{
     resultArray.push("La raiz cuadradra de "+arrayFunc+ " es : "+resultRaiz.toFixed(3));
}
}
