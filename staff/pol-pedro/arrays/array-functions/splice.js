function thesplice(array, index, cut, string) {
    debugger;
    var stringBuff = [];
    for (var i = 0; i < array.length; i++){
        stringBuff[i] = array[i];
    }
    if (index < 0) {
        index + array.length < 0 ? index = 0 : index = index + array.length;
    }
    // hacer un if para ver si el index es inferior a 0 y operear adecuadamente 
    array.length = 0;
    var stringRemoved = [];
    if(typeof index != 'undefined' && typeof cut != 'undefined') {
        var cont = 0;
        var onIndex = false;
        for (var i = 0; i < stringBuff.length; i++) {
            debugger;
            if(i === index && !onIndex){ 
                if (typeof string != 'undefined'){
                    //debugger;
                    array[cont] = string;
                    cont++;
                    for (var g = 0; g < (arguments.length - 4); g++){
                        array[cont] = arguments[4 + g];
                        cont++;
                    }
                }
                for (var g = 0; g < cut; g++){
                    stringRemoved[g] = stringBuff[g + i];
                }
                i = i + (cut - 1) ;
                onIndex = true
            }
            else {
                array[cont] = stringBuff[i];
                cont++;
            }
        }
    }
    debugger;
    return stringRemoved;
}

/*
array = ['angel', 'clown', 'trumpet', 'sturgeon'];

delt = thesplice (array, 0, 2, 'parrot', 'anemone', 'blue');
*/