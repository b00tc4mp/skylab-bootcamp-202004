"use estrict"


describe('Arroz.prototype.filter', function() {
    it('filter a array and return an new array', function() {
        var array = new Arroz(5, 2, 1);

        var newArray = array.filter(function(element) {
            return element < 4;
        });

        expect(newArray[0]).toBe(2);
        expect(newArray[1]).toBe(1);
    });
    it('filter a array and return -1 if no find coincidence', function() {
        var array = new Arroz('Hola', 'que', 'Tal');
        var newArray = array.filter(function(element) {
            return element.length > 5;
        });

        expect(newArray).toBe(-1);
    });
    it('filter a array is empty return -1 if no find coincidence', function() {
        var array = new Arroz();
        var newArray = array.filter(function(element) {
            return element.length > 5;
        });
        expect(newArray).toBe(-1);
    });
    it('filter index optional', function() {
        var array = new Arroz(5, 2, 1, 4);
        var cont = 0
        var newArray = array.filter(function(element, index) {
            expect(index).toBe(cont++)
            return element <= 2;
        });

        expect(newArray[0]).toBe(2);
        expect(newArray[1]).toBe(1);
    });
    it('filter a array optional', function() {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.filter(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
    it('should throw error on non-function expression', function() {
        var array = new Arroz(1, 2, 3);
        var result;

        try {
            array.filter();
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('undefined is not a function');

        result = undefined;

        try {
            array.filter('hello');
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('hello is not a function');

        result = undefined;

        try {
            array.filter(true);
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('true is not a function');
    });
});