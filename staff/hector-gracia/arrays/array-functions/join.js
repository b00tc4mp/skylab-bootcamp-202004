function join(array,separator){
    if(typeof separator!=undefined)
    {
        separator="";
    }
    var aux="";
    for (var i=0; i<array.length; i++){
        aux += array[i];
        aux+=separator;
    }
    return aux;
}