function sum () {
    var acc = 0 ;
    for (num in arguments ) {
    acc += arguments [num];
    }
    if (acc % 1 == 0) {
        return acc;
    } else {
        return acc.toFixed(3);
    }   
}

//returns the substraction of some numbers inserted in a array//
function substract () {
    var acc = 0;
    for (num in arguments ) {
        if (num == 0) {
        acc += arguments[num];
    } else {
        acc -=  arguments[num];
    }
    }
    if (acc % 1 == 0) {
        return acc;
    } else {
        return acc.toFixed(3);
    }  
}

//returns the multiplication of some numbers inserted in a array//
function multiply () {
    var acc = 0;
    for (num in arguments) {
        if (num == 0) {
            acc += arguments[num];
        } else {
            acc = acc * arguments[num];
        }
    }
    if (acc % 1 == 0) {
        return acc;
    } else {
        return acc.toFixed(3);
    }  
}

//returns the division of some numbers inserted in a array//
function divide  () {
    var acc = 0;
    for (num in arguments) {
        if (num == 0) {
            acc += arguments[num];
        } else {
            acc = acc / arguments[num];
        }
    }
    if (acc % 1 == 0) {
        return acc;
    } else {
        return acc.toFixed(3);
    }  
}



//initiating calculator//
var arg = 0;  //prompt variable//
var numbers = []; //array of numbers to calculate//
var results = []; //variable to show the results//
var end = false; //when this becomes 'true' the program will finish//


//ending loop//
while (end == false) {
    arg = 0;
    numbers = [];
    results = [];
//this loop inserts the user numbers to the calculated array//
	while (isNaN(arg) == false || arg === "") {
	arg = prompt("Insert a number or finish /If you only have 1 number will sqrt root");
	arg = parseFloat(arg);
		if (isNaN(arg) == false && arg != "") {
		numbers.push(arg); //if the number is valid, this method push the variable to the array//
		}
	}
    if (numbers.length == 1) {
        numbers = Math.sqrt(numbers);
        if (numbers % 1 == 0) {
            console.log(numbers); 
        }
        console.log(numbers.toFixed(3)); 
    }
    
    //calculation and pushing into the 'numbers' array//
    if (numbers.length > 1) { 
    results.push(sum(...numbers));
	results.push(substract(...numbers));
	results.push(multiply(...numbers));	
	results.push(divide(...numbers));

	console.log(results);
	}
	//with this loop we can restart the app//
	let newStart = prompt ( "New numbers? y/n" );
	switch(newStart) {
	case "y" :
		arg = 0; 
		break;
	case "n" :
		console.log("Bye!"); 
		end = true; break;
	default:
		arg = 0; 
		break;
	}
}