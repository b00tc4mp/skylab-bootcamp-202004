let input = [1, 2, 3, 4, 5, 6];
function add5(number){
    return number + 5;
};
function map(array, callback){
    let output=[];
    for (let i=0; i<array.length; i++){
        output[i] = callback(array[i])
    };
    return output;
};

map(input, add5);
