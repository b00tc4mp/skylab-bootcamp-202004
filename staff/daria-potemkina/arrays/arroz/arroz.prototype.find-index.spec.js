'use strict';

describe('Arroz.prototype.findIndex', function () {

    it('should iterate on each element and return a first element greater than 10', function () {
        var array = new Arroz(111, 20, 3);

        var result = array.findIndex(function (element) {
            return element > 10;
        });

        expect(result).toBe(0);
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.findIndex (function (element) {
            return element > 10;
        });

        expect(result).toEqual(-1);
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');

        var result = array.findIndex(function (element) {
            return element === 'mundo';
        });

        expect(result).toEqual(-1);
    });

    it('should iterate on each element and return a first element that length is iqual to 8 and index should be equal to 3', function () {
        var array = new Arroz ('hola', 'pepito', 'daria', 'elemento');

        var result = array.findIndex(function (element) {
            return element.length === 8;
        });

        expect(result).toEqual(3);
    });

    it('should iterate on each element and return a first element that length is iqual to 8 provide the full array from the third argument of the expression', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');
        var arr = new Arroz ();

        var result = array.findIndex(function (element, index, array) {
            arr[index] = array
            return element.length === 8; 
        });
    
        expect(result).toEqual(3);
        expect(arr[0]).toBe(array);
        expect(arr[1]).toBe(array);
        expect(arr[2]).toBe(array);
        expect(arr[3]).toBe(array);
    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 2, 3);
        
        expect(function(){
            array.findIndex(1);
        }).toThrowError(TypeError, '1 is not a function!');

        expect(function(){
            array.findIndex('hola');
        }).toThrowError(TypeError, 'hola is not a function!');

        expect(function(){
            array.findIndex(true);
        }).toThrowError(TypeError, 'true is not a function!');

        /*var result;

        try {
            array.findIndex('hola');
        } catch (error) {
            result = error;
        }


        expect(result.message).toBe('hola is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.findIndex();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('undefined is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.findIndex(true)
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();*/
    });

});