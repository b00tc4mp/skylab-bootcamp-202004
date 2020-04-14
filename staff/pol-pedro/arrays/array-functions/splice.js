function thesplice(array, index, cut, string) {
    var stringBuff = [];
    if(typeof index != 'undefined' && typeof cut != 'undefined' && typeof string != 'undefined' ) {
        var cont = 0;
        var onIndex = false;
        for (var i = 0; i < array.length; i++) {
            debugger;
            if(i === index && !onIndex){
                if (typeof string === 'string'){
                    debugger;
                    stringBuff[cont] = string;
                    cont++;
                }
                i = i + (cut - 1);
                onIndex = true
            }
            else {
                stringBuff[cont] = array[i];
                cont++;
            }
        }
    }
    return stringBuff
    //(for (var i = 0; i < array.length; i++){

    //}
}