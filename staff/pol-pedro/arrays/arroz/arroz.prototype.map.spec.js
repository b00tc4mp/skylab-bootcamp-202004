describe('map', function () {
    it('should iterate on each element and creat a new array with each value multiplied by 10 ', function () {
        var array= new Arroz(1, 2, 3);
        var result = [];

        result = array.map(function(element, index) {
            debugger;
            return element * 10;
        });

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);
    });
    it('should iterate on each element and creat a new array with each value in upper-case in a new array', function () {
        var array = new Arroz('hello', 'cruel', 'world');
        var result = [];

        result = array.map(function(element, index) {
            debugger;
            return element.toUpperCase();
        });

        expect(result[0]).toBe('HELLO');
        expect(result[1]).toBe('CRUEL');
        expect(result[2]).toBe('WORLD');
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.map(function(element, index, array) {
            result[index] = index;
            return result
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.map(function(element, index, array) {
            result[index] = array;
            return result
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

});