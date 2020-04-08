function calculator(arg){
    let oper;
    //convertir arguments en array
    //let arg=Array.from(arguments);
    if (arg.length>1){
        oper=[sum(arg), res(arg),mul(arg),div(arg)];
        oper=decimals(oper);
        console.log(["Suma: " + oper[0],"Resta: "+oper[1],"Multiplicación: "+oper[2],"División: "+oper[3]]);
    }else{
        oper=[Math.sqrt(arg[0])];
        oper=decimals(oper);
        console.log(["Raíz Cuadrada: " + oper[0]]);
    }
}

function decimals(operations){
    for (let i=0;i<operations.length;i++){
        if (operations[i]==operations[i].toFixed(0)){
            operations[i]=operations[i].toFixed(0);
        } else if (operations[i]==operations[i].toFixed(1)){
            operations[i]=operations[i].toFixed(1);
        } else if (operations[i]==operations[i].toFixed(2)){
            operations[i]=operations[i].toFixed(2);
        } else {
            operations[i]=operations[i].toFixed(3);
        }
    }
    return operations;
}

//función suma
function sum(arr) {
    let acc = arr[0];

    for (let num=1;num<arr.length;num++) {
        

        acc += arr[num];
    }

    return acc;
}

//función resta
function res(arr) {
    let acc = arr[0];

    for (let num=1;num<arr.length;num++) {
        

        acc -= arr[num];
    }

    return acc;
}

//función multiplicación
function mul(arr) {
    let acc = arr[0];

    for (let num=1;num<arr.length;num++) {
        

        acc *= arr[num];
    }

    return acc;
}

//función división
function div(arr) {
    let acc = arr[0];

    for (let num=1;num<arr.length;num++) {
        

        acc /= arr[num];
    }

    return acc;
}

//verificar que se introduce un número en n1
var n1=prompt("Number: ");
while (!Number(n1)){
    alert("Invalid number")
    n1=prompt("Number: ");
}
n1=Number(n1);

var numEntered = [n1];
//verificar que se introduce un número o que no se introduce nada en n2
var n2=prompt("Number: ");
while (n2){
    if (!Number(n2)){
        alert("Invalid number")
    }else{
        n2=Number(n2);
        numEntered.push(n2);
    }
    n2=prompt("Number: ");
}


calculator(numEntered);

var another=prompt("New numbers? y/n")
while (true){
    if (another=="y"){
        
    }
}
