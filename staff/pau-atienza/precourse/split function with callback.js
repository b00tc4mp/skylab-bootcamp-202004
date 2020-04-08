//Para miercoles: split(), splice();
//Resolver problema de asincronía utilizando callbacks (Settimeout());
//Split: los inputs son un string y el separador. El output es un array que contiene los strings separados

function split(string, separator){
    let output = [];
    let counterInput = 0;
    let counterOutput = 0
    for (var i = 0; i < string.length; i++){
        if (string[i] == separator){
            output[counterOutput] = '';
            for(counterInput; counterInput < i; counterInput++){
            output[counterOutput] += string[counterInput];
            };
            counterInput = i + 1;
            counterOutput += 1;
        };
    };
    if (counterInput < string.length){
        output[counterOutput] = '';
        for(counterInput; counterInput < i; counterInput++){
            output[counterOutput] += string[counterInput];
        };
    };
    return output;
};