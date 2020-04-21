// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map

function map(array, expression) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr[i] = expression(array[i], i, array);

    }
    return arr;
}