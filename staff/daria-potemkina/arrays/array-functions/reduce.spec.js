describe('reduce', function () {

it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
    
    var array = [1, 2, 3, 4];

    var result = reduce(array, function(accumulator, currentValue) {
        return accumulator + currentValue;
    }, );

    expect(result).toBe(10);
    expect(array).toEqual([1,2,3,4]);

    array = [1, 2, 3, 4];

    result = reduce(array, function(accumulator, currentValue) {
        return accumulator + currentValue;
    }, 50);

    expect(result).toBe(60);
    expect(array).toEqual([1,2,3,4]);

});

it('the empty array should return a TypeError', function(){
    var array = [];
    var result;

    try{
        reduce(array, function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, );
    }catch(error){
        result = error;
    }

    expect(result.message).toBe('Reduce of empty array with no initial value');
})
});