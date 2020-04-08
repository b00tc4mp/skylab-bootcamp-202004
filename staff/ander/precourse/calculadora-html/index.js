"use strict"
var total=0;
var init=false;
var suma=false;
var resta= false;
var multi=false;
var divi=false;


var salida= document.querySelector("input");
//efectos botones
var efectBoton= document.querySelectorAll("button");
for (let x = 0; x < efectBoton.length; x++) {
    
    efectBoton[x].addEventListener('mousedown', function() { //el raton se esta presionando
    efectBoton[x].style.opacity="0.7";
    });
    efectBoton[x].addEventListener('mouseup', function() { // el raton se deja de presionar
        efectBoton[x].style.opacity="1";
    });
        efectBoton[x].addEventListener('mouseleave', function() { //El ratón está afuera del elemento
        efectBoton[x].style.opacity="1";
});
}
//Botones de numeros
for (let x = 0; x <10; x++) {
var num=document.getElementById(JSON.stringify(x));   //1 JSON.stringify(x) = le pone comillas dobles a la variable de frma que elgetbyelementid funciona

num.addEventListener("click", function () {
    if(init==true)salida.value="";
    salida.value+=x;
    init=false;
});
}

//OPERADORES LOGICOS
//SUMA
var sumar=document.getElementById("suma"); 
sumar.addEventListener("click",function () {
    init=true;
    pro();
    suma=true;
    if(salida.value=="NaN") salida.value="";
});
//RESTA
var restar=document.getElementById("resta"); 
restar.addEventListener("click",function () {
    init=true;
    pro();
    resta=true;
    if(salida.value=="NaN") salida.value="";
});
//MULTIPLICACION
var multiplicar=document.getElementById("multi"); 
multiplicar.addEventListener("click",function () {
    init=true;
    pro();
    multi=true;
    if(salida.value=="NaN") salida.value="";
});
//DIVISION
var dividir=document.getElementById("divi"); 
dividir.addEventListener("click",function () {
    init=true;
    pro();
    divi=true;
    if(salida.value=="NaN") salida.value="";
});
//BOTON IGUAL
var igual=document.getElementById("igual");
igual.addEventListener("click", function () {
pro();
    if(salida.value=="NaN") salida.value="";
})

function pro() {

    allFalse();
    if(suma==true){
        total+=parseFloat(salida.value)
        salida.value=parseFloat(total);
        suma=false;
    }
    if(resta==true){
        total-=parseFloat(salida.value)
        salida.value=parseFloat(total);
        resta=false;
    }
    if(multi==true){
        total*=parseFloat(salida.value)
        salida.value=parseFloat(total);
        multi=false;
    }
    if(divi==true){
        total/=parseFloat(salida.value)
        salida.value=parseFloat(total);
        divi=false;
    }    
}

function allFalse() {
    if((suma==false) && (resta==false) && (multi==false) && (divi==false)){
        total=parseFloat(salida.value)
        salida.value=parseFloat(total);
    }
}

//BOTON AC
var ac=document.getElementById("ac"); 
ac.addEventListener("click", function () {
    total=0;
    salida.value="";
});
// BOTON COMA
var coma= document.getElementById("coma");
coma.addEventListener("click", function () {
salida.value+=".";


});
//BOTON RETURN
var ret= document.getElementById("return");
ret.addEventListener("click", function () {
    salida.value= salida.value.slice(0, -1);
    
});




