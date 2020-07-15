var num1="3";
var num2="5";
var result=[];

function sum(n1,n2){
    return n1+n2;
}
function res(n1,n2){
    return n1-n2;
}
function mul(n1,n2){
    n1*n2;
}
function div(n1,n2){
    n1/n2;
}
function calculate(n1,n2)
{
    if(n1!== NaN && n2!== NaN){
    n1= +n1.toFixed(3);
    n2= +n2.toFixed(3);
    result.push(n1+n2);
    result.push(n1-n2);
    result.push(n1*n2);
    result.push(n1/n2);
        for(var i=0;i<result.length;i++){
            console.log(result[i]);
        }
    }else if(typeof n1!= NaN){
        result.push(Math.sqrt(n1));
        console.log(result[0]);
    }else if(typeof n2!=  NaN){
        result.push(Math.sqrt(n2));
        console.log(result[0]);
    }else {
        console.log("No se ha insertado ningún número");
        var volver= prompt("New numbers? y/n","n")
        if(volver=="y"){
            console.log("Ahora le atiendo");
        }else{
            console.log("pos ok");
        }
    }
}

num1=Number(prompt("Introduce un número","0"));
if(num1==NaN)console.log("la liaste")
num2=Number(prompt("Introduce un número","0"));
console.log(num2);
calculate(num1,num2);


