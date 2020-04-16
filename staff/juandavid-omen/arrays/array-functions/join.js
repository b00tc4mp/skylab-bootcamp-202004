function join(array, separator){
    if(arguments.length === 1){
        var separator = ","; 
    };

    var string = array[0];
    for (i=1; i<array.length; i++){
        if (array[i] === undefined || array[i] === null){
            string += separator;
        }
        else{
            string += separator + array[i].toString();
        };
        
    };
    return string;
};