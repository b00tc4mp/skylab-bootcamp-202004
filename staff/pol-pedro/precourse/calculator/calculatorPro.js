//funciones programa
var verNums = (a, b) => { //ver si se han introducido dos numeros 
    if (Number.isNaN(a) && Number.isNaN(b)){
        console.log('Error: tienes que introducir dos numeros');
        return false;

    }
    else {
        return true;
    }
}
var oneNum = (a, b) => {
    if (Number.isNaN(a) || Number.isNaN(b)) {
        if (Number.isNaN(a)) {
            console.log('The square root of ' + b + ' is ' + Math.round(raizQ(b) * 1000) / 1000);
        }
        else {
            console.log('The square root of ' + a + ' is ' +  Math.round(raizQ(a) * 1000) / 1000);
        }
        return true;
    }
    else {
        return false;
    }
}
var saveResult = (a,  b) => { //guarda las operaciones en el array
    var op = [' + ', ' - ', ' * ', ' / '];
    var contEq = 0, contNum = 0;
    memoryNum.push(a);
    memoryNum.push(b);
    memoryEq.push(Math.round(suma(a, b) * 1000) / 1000); //guardamos los resultados y redondeamos a 3 decimales
    memoryEq.push(Math.round(resta(a, b) * 1000) / 1000);
    memoryEq.push(Math.round(multi(a, b) * 1000) / 1000);
    memoryEq.push(Math.round(division(a, b) * 1000) / 1000);
    for (var i in memoryEq) {
        result[i] = (' ' + memoryNum[contNum] + op[contEq] + memoryNum[contNum + 1] + ' = ' + memoryEq[i]);
        contEq ++;
        if (contEq == 4){
            contEq = 0;
            contNum +=2;
        }
    }
}
var newNums = () => {
    var ans;
    do{
        ans = prompt('New numbers? y/n');
        if (!(ans === 'y' || ans === 'n')) {
            console.log('type y/n');
        }
    }while (!(ans === 'y' || ans === 'n'));
    if (ans === 'y') {
        return false;
    }
    else {
        return true;
    }
}
var suma = (a, b) => a+b;  //suma 
var resta = (a, b) => a-b;  //resta 
var multi = (a, b) => a*b;  //multiplicacion
var division = (a, b) => a/b;  //division
var raizQ = a => Math.sqrt(a);  //raiz cuadrada
//declaracion variables e inicio programa
var result = [];
var memoryEq = [];
var memoryNum = [];
var a, b;
do {
    do{  //bucle para introducir los valores correctos
        a = parseFloat(prompt ('First number:'));  //cambiar parseFloat por Number
        b = parseFloat(prompt ('Second number:'));
    } while (verNums(a, b) == false);
    
    if (oneNum (a, b) == false){
        saveResult(a, b);
        console.log('results =' + result);
    }
}while (newNums() == false);
console.log('Bye !');

