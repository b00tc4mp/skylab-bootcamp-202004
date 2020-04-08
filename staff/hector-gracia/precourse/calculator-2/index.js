// JavaScript Document
let current=0;//El numero que inserta el usuario
let value=0; //El resultado de los calculos
let action="wait";//La accion que tiene que va a realizar
//Limpia los valores de la calculadora
const clean=()=>{
    action="wait";
    current=0;
    value=0;
    document.form.textview.value="";
}
//Introduce los numeros a la calculadora
const insert=(num)=>{
    document.form.textview.value+=num;
}
//Hace la operacion correspondiente al boton pulsado
const operate=(operation)=>{
    solve();
    current=0;
    action=operation;
    document.form.textview.value="";
}
//Muestra los resultados
const show=()=>{
    document.form.textview.value=value.toString();
    action="wait";
}
//Realiza los calculos
const solve=()=>{
    current= parseFloat(document.form.textview.value);
    if(isNaN(current))current=0;
    switch(action){
        case "wait":
            value=current;
            break;
        case "add":
            value+=current;
            break;
        case "sub":
            value-=current;
            break;
        case "div":
            value/=current;
            break;
        case "mul":
            value*=current;
            break;
    }
    console.log(value);
    show();
    
}
