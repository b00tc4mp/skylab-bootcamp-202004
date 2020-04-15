describe('findIndex', function () {

it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
    
    var array = [1, 2, 3, 4];

    var result = reduce(array, function(accumulator, currentValue) {
        return accumulator + currentValue;
    }, );

    expect(result).toBe(10);
    expect(array).toEqual([1,2,3,4]);

})
});