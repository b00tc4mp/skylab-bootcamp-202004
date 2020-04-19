'use strict';

describe('Arroz.prototype.filter', function () {

    it('should iterate on each element and return a new instance with values greater than 10', function () {
        var array = new Arroz(111, 20, 3);

        var arr = array.filter(function (element) {
            return element > 10;
        });

        expect(arr instanceof Arroz).toBeTruthy();
        expect(arr[0]).toBe(111);
        expect(arr[1]).toBe(20);
        expect(arr.length).toBe(2);
        expect(array.length).toBe(3);
        expect(array[0]).toBe(111);
        expect(array[1]).toBe(20);
        expect(array[2]).toBe(3);

    });

    it('should iterate on each element and return an instance with length zero', function () {
        var array = new Arroz(111, 20, 3);

        var arr = array.filter(function (element) {
            return element > 200;
        });

        expect(arr.length).toBe(0);
    });

    it('should iterate on each element and return a new instance with values greater than 5 characters', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');

        var arr = array.filter(function (element) {
            return element.length > 5
        });

        expect(arr.length).toBe(2)
        expect(arr[0]).toEqual('pepito');
        expect(arr[1]).toEqual('elemento');
    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 2, 3);

        expect(function(){
            array.filter('hola');
        }).toThrowError(TypeError, 'hola is not a function!');

        expect(function(){
            array.filter(1);
        }).toThrowError(TypeError, '1 is not a function!');

        expect(function(){
            array.filter(true);
        }).toThrowError(TypeError, 'true is not a function!');

        /*var result;

        try {
            array.filter('hola');
        } catch (error) {
            result = error;
        }


        expect(result.message).toBe('hola is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.filter();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('undefined is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.filter(true)
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();*/
    });


});