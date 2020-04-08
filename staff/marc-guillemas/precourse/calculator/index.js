
function calc(){
    var n1 = prompt("Type the first number:")
    var answr = prompt("Do you want to add another number? y/n")
    var result = [];

    if(answr === "y"){
        var n2 = prompt("type the second number:");
        result[0] = parseFloat(n1) + parseFloat(n2);
        result[1] = n1 - n2;
        result[2] = n1 * n2;
        result[3] = n1 / n2;

        for(var i = 0; i < result.length; i++){
            result[i] = Math.floor(result[i] * 100) / 100;
        }
    
        console.log(n1+" + "+n2+" = "+result[0]);
        console.log(n1+" - "+n2+" = "+result[1]);
        console.log(n1+" * "+n2+" = "+result[2]);
        console.log(n1+" / "+n2+" = "+result[3]);
    
   
    }else if(answr === "n"){
        result[0] = Math.sqrt(n1);
        result[0] = Math.floor(result[0] * 100) / 100;
        console.log("\u221a"+n1+"  = "+result[0]);
    }else if(typeof n1 != "number" || typeof n2 != "number"){
        console.log("Please type numbers only");

    }
}

calc();

