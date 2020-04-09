     
function calc (num1,num2){ 
    var num1 = prompt("Introduce un numero...");
        var num2 = prompt("Introduce otro...:")
        if (isNaN(num1) || isNaN(num2)){
            alert("Solo puedes introducir numeros")
        }
        else {
            if (num2){
                //Calculo de la suma
                var resulSuma = (num1 * 1) + (num2 * 1);
                if (resulSuma % 1 == 0){
                  resulSuma = resulSuma  
                }
                else { 
                    resulSuma = resulSuma.toFixed(3);
                     }
                //Calculo de la resta
                var resultResta = num1 - num2;
                if (resultResta % 1 == 0){
                    resultResta = resultResta;
                }
                else {
                    resultResta = resultResta.toFixed(3);
                }
                //Calculo de la multiplicacion
                var resultMulti = num1 * num2;
                if (resultMulti % 1 == 0){
                    resultMulti = resultMulti;
                }
                else {
                    resultMulti = resultMulti.toFixed(3);
                }
                //Calculo de la division   
                var resultDivi = num1 / num2;
                if (resultDivi % 1 == 0){
                    resultDivi = resultDivi;
                }
                 else { 
                    resultDivi = resultDivi.toFixed(3)
                    }
                
                var results = [resulSuma,resultResta,resultMulti,resultDivi,];
            alert("El resultado de la suma es: " + resulSuma + "\nEl resultado de la resta es: " + resultResta + "\nEl resultado de la multiplicacion es: " + resultMulti + "\nEl resultado de la division es: " + resultDivi);
            }
            else {
                var resultCuadrado = Math.sqrt(num1);
                if (resultCuadrado % 1 == 0){
                    resultCuadrado = resultCuadrado;
                    
                }
                else {
                    resultCuadrado = resultCuadrado.toFixed(3);
                    alert("El resultado de la raiz cuadrada es: " + resultCuadrado);
                }
                
            }
        }
    
      
        
    }
        
        calc ()
