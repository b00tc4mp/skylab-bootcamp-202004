
describe('map', function () {
    it('should iterate on each element and keep each value multiplied by 2 in a new external array', function () {
        
        var array = [1, 2, 3]
        map(array, function (element, index, array) {
            array[index] = element * 2});

        expect(array[0]).toBe(2);
        expect(array[1]).toBe(4);
        expect(array[2]).toBe(6);
    });

it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
    
    var array = [1, 2, 3];
    map(array, function(element, index, array) {
        array[index] = index;
    });

    expect(array[0]).toBe(0);
    expect(array[1]).toBe(1);
    expect(array[2]).toBe(2);
});

it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
    
    var array = [1, 2, 3];
    map(array, function(element, index, array) {
        array[index] = array;
    });

    expect(array[0]).toBe(array);
    expect(array[1]).toBe(array);
    expect(array[2]).toBe(array);
});

    it('should iterate on each element and keep each string by uppercase in a new external array', function () {
        
        var array = ['sergi', 'daria', 'manu']
        map(array, function (element, index, array) {
            array[index] =  element.toUpperCase() });

        expect(array[0]).toBe('SERGI');
        expect(array[1]).toBe('DARIA');
        expect(array[2]).toBe('MANU');
    });
})