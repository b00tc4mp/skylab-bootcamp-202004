let num1="3";
let num2="5";
let result=[];

const sum = (n1,n2)=> n1+n2;
const res = (n1,n2)=> n1-n2;
const mul = (n1,n2)=> n1*n2;
const div = (n1,n2)=> n1/n2;
const calculate= (n1,n2)=>
{
    if(n1!== NaN && n2!== NaN){
    n1= +n1.toFixed(3);
    n2= +n2.toFixed(3);
    result.push(n1+n2);
    result.push(n1-n2);
    result.push(n1*n2);
    result.push(n1/n2);
        for(let i=0;i<result.length;i++){
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
        let volver= prompt("New numbers? y/n","n")
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


