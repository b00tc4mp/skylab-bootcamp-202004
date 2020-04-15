describe('map', function () {
    it('should iterate on each element and return new array with each value multiplied by 2', function () {
        
        var array = [1, 2, 3]
        var arr = map(array, function (element, index, array) {
            return element * 2;
        });

        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(6);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });


    it('should iterate on each element and keep each string by uppercase in a new external array', function () {
        
        var array = ['sergi', 'daria', 'manu']
        var arr = map(array, function (element, index, array) {
            return element.toUpperCase() });

        expect(arr[0]).toBe('SERGI');
        expect(arr[1]).toBe('DARIA');
        expect(arr[2]).toBe('MANU');
    });

});

