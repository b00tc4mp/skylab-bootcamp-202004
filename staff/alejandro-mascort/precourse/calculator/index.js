function calculator(a,b){
    let oper;

    if (b){
        oper=[a+b, a-b,a*b,a/b];
        oper=decimals(oper);
        console.log(["Suma: " + oper[0],"Resta: "+oper[1],"Multiplicación: "+oper[2],"División: "+oper[3]]);
    }else{
        oper=[Math.sqrt(a)];
        oper=decimals(oper);
        console.log(["Raíz Cuadrada: " + oper[0]]);
    }
}

// función que convierte cada número del array a un número con máximo 3 decimales
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
//verificar que se introduce un número en n1
n1=prompt("Número 1: ");
while (!Number(n1)){
    alert("Número Inválido, vuelve a probar")
    n1=prompt("Número 1: ");
}
n1=Number(n1);

//verificar que se introduce un número o que no se introduce nada en n2
n2=prompt("Número 2: ");
if (n2!=""){
    while ((!Number(n2))&&(n2!="")){
        alert("Número Inválido, vuelve a probar")
        n2=prompt("Número 2: ");
    }
    n2=Number(n2);
    calculator(Number(n1),Number(n2));
} else {
    calculator(Number(n1));
}

