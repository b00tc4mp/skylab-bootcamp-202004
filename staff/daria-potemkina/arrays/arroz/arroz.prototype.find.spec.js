'use strict';

describe('arroz.prototype.find', function () {

    it('should iterate on each element and return a first element greater than 10', function () {
        var array = new Arroz(111, 20, 3);

        var result = array.find(function (element) {
            return element > 10;
        });

        expect(result).toEqual(111);
        expect(array[0]).toBe(111);
        expect(array[1]).toBe(20);
        expect(array[2]).toBe(3);
    });

    it('should iterate on each element and return undefined ', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.find(function (element) {
            return element > 10;
        });

        expect(result).toEqual(undefined);
    });

    it('should iterate on each element and return undefined ', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');

        var result = array.find(function (element) {
            return element === 'mundo';
        });

        expect(result).toEqual(undefined);
    });

    it('should iterate on each element and return hola ', function () {
        var array = new Arroz('hola', 'pepito', 'daria', 'elemento');

        var result = array.find(function (element) {
            if (element.length === 4) {
                return element;
            }
        });
        expect(result).toEqual('hola');
    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 2, 3);
        
        expect(function(){
            array.find(1);
        }).toThrowError(TypeError, '1 is not a function!');

        expect(function(){
            array.find('hola');
        }).toThrowError(TypeError, 'hola is not a function!');

        expect(function(){
            array.find(false);
        }).toThrowError(TypeError, 'false is not a function!');
        
        /*var result;

        try {
            array.find('hola');
        } catch (error) {
            result = error;
        }


        expect(result.message).toBe('hola is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.find();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('undefined is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();

        result = undefined;

        try {
            array.find(true)
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a function!');
        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();*/

    });
});