// returns a 
// shallow copy of a 
// portion of an array into a
//  new array object selected 
//  from begin to end(end not included) 
//  where begin and end represent the 
//  index of items in that 
// array.The original array will 
// ot be modified.


function slice(array, start, end) {
    var newArray = [];
    if (end === undefined) end = array.length;
    for (var i = start; i < end; i++) {
        newArray[newArray.length] = array[i];
    }

    return newArray;
}