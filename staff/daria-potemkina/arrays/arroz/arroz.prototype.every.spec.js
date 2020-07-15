'use strict';

describe('Arroz.prototype.every', function () {

    it('should iterate on each element and return true because all elements meet the condition', function () {
        var array = new Arroz(111, 20, 3);

        var result = array.every(function (element) {
            return element > 2;
        });

        expect(result).toBeTruthy();
        expect(array[0]).toBe(111);
        expect(array[1]).toBe(20);
        expect(array[2]).toBe(3);
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition', function () {
        var array = new Arroz(1, 20, 3);

        var result = array.every(function (element) {
            return element > 10;
        });

        expect(result).toBe(false);
    });

    it('should iterate on each element and return true because all elements meet the condition', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');

        var result = array.every(function (element) {
            return (element.length >= 4);
        });

        expect(result).toBeTruthy();
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition, check the index of element', function () {
        var array = new Arroz ('hola', 'pepito', 'daria', 'elemento');

        var result = array.every(function (element) {
            return element.length === 5;

        });
        expect(result).toBe(false);

    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 20, 3);

        expect(function(){
            array.every(1)
        }).toThrowError(TypeError, '1 is not a function');

        expect(function(){
            array.every();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function(){
            array.every(true);
        }).toThrowError(TypeError, 'true is not a function');

        /*var result;

       try {
            array.every(1);
        } catch (error) {
            result = error;
        }


        expect(result.message).toBe('1 is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.every();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('undefined is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.every(true);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();*/
    });


});