function includes(string, searchString,position) {
    debugger
    var test = 0;
    var i = 0
    if(typeof position === 'undefined'){
        position = 0;
    };

        for (var x = position; x < string.length; x++) {
            if (searchString[i] === string[x]) {
                test++
                i++
                if (searchString.length === test) {
                    return true;
                }
            } else {
                test = 0;
            }
        }
   return false
}

