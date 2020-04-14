function push(array) {
    var arrLength = array.length
    if (arguments.length > 1) {
        var arg = [];

        for (var i = 1; i < arguments.length; i ++) arg[arg.length] = arguments[i]

        for (var i = 0; i < arg.length; i++) {
            array[arrLength+i] = arg[i];
        }
    }
    return array.length;
}