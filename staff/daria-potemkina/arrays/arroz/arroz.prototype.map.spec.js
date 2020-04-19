describe('Arroz.prototype.map', function () {
    it('should iterate on each element and return new instance with each value multiplied by 2', function () {
        var array = new Arroz(1, 2, 3);
        var indexes = [];
        var arrays = [];

        var arr = array.map(function (element, index, array) {
            indexes.push(index);
            arrays.push(array);

            return element * 2;
        });

        expect(arr instanceof Arroz).toBeTruthy();
        expect(arr).not.toBe(array);
        expect(arr.length).toBe(array.length);
        expect(indexes[0]).toBe(0);
        expect(indexes[1]).toBe(1);
        expect(indexes[2]).toBe(2);
        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });


    it('should iterate on each element and keep each string by uppercase in a new external array', function () {

        var array = new Arroz('sergi', 'daria', 'manu');

        var arr = array.map(function (element) {
            return element.toUpperCase()
        });

        expect(arr[0]).toBe('SERGI');
        expect(arr[1]).toBe('DARIA');
        expect(arr[2]).toBe('MANU');
    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 2, 3);

        expect(function(){
            array.map(1)
        }).toThrowError(TypeError, '1 is not a function!');

        expect(function(){
            array.map()
        }).toThrowError(TypeError, 'undefined is not a function!');

        expect(function(){
            array.map('hola')
        }).toThrowError(TypeError, 'hola is not a function!');

        /*var result;

        try {
            array.map(1);
        } catch (error) {
            result = error;
        }


        expect(result.message).toBe('1 is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.map();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('undefined is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.map(true);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();*/
    });
});

