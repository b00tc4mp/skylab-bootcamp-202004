var numbers=[]

function sum(numbers) {
    var acc= parseInt(numbers[0])
        for(var i=1;i<numbers.length;i++){
            var num=parseInt(numbers[i])  
            acc+=num
            //console.log(`la suma de ${numbers[i-1]} + ${num} es ` + acc)
        }
        console.log('la suma total es '+(Math.round((acc)*1000)/1000)) 
}

function minus(numbers) {
    var acc= numbers[0]
        for(var i=1;i<numbers.length;i++){
            var num=parseInt(numbers[i])  
            acc -=num
        }
        console.log('la resta total es '+Math.round((acc)*1000)/1000)    
}

function times(numbers) {
    var acc= numbers[0]
        for(var i=1;i<numbers.length;i++){
            var num=parseInt(numbers[i])  
            acc *= num
        }
        console.log('la mutiplicacion total es '+Math.round((acc)*1000)/1000)    
}

function div(numbers) {
    var acc= numbers[0]
        for(var i=1;i<numbers.length;i++){
            var num=parseInt(numbers[i])  
            acc /= num
        }
        console.log('la division total es '+Math.round((acc)*1000)/1000)
}

function sqrt(numbers){
    var sqrt=Math.sqrt(numbers[0])
    num=Math.round((sqrt)*1000)/1000
    console.log(`la raiz cuada de ${numbers[0]} es ${num}`)
    num=numbers.push
}

function calculatorPro() {
    confirmation=true
    while(confirmation===true){
        for(var i=numbers.length;confirmation===true;i++){
            numbers[i]=prompt("Introduzca un valor con el que quiere operar") 
                if(isNaN(numbers[i])|| numbers[i]==''){
                    alert("Numero invalido")
                    numbers[i]=prompt("Teclea el siguiente numero")
                }
            confirmation=confirm("Quieres seguir anadiendo numeros con los que operar?")  
        }

        switch(numbers.length){
            case 0:
                alert("no has introducido ningun numero")
                confirmation=true
                break;
            case 1:
                sqrt(numbers)
                break;
            default:
                sum(numbers)
                minus(numbers)
                times(numbers)
                div(numbers)
                break;
        }

        confirmation=confirm("Quieres seguir anadiendo numeros con los que operar?")
    }

    alert("gracias, nos vemos pronto")
}

calculatorPro(numbers)