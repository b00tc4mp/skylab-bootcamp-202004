'use strict';

describe('Arroz.prototype.map', function () {
    it('should iterate on each numeric element and  return a new instance with each value multiplied by 10', function () {
        var array = new Arroz(1, 2, 3);
        var indexes = [];
        var arrays = [];

        var result = array.map(function (element, index, array) {
            indexes.push(index);
            arrays.push(array);

            return element * 10;
        });

        expect(result instanceof Arroz).toBeTruthy();
        expect(result).not.toBe(array);
        expect(result.length).toBe(array.length);
        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);

        for (var i = 0; i < indexes.length; i++)
            expect(indexes[i]).toBe(i);

        for (var i = 0; i < arrays.length; i++)
            expect(arrays[i]).toBe(array);

        for (var i = 0; i < arrays.length; i++)
            expect(array[i]).toBe(i + 1);
    });

    it('should iterate on each string element and  return a new instance with each value multiplied by 10', function () {
        var array = new Arroz('a', 'b', 'c');
        var indexes = [];
        var arrays = [];

        var result = array.map(function (element, index, array) {
            indexes.push(index);
            arrays.push(array);

            return element.toUpperCase();
        });

        expect(result instanceof Arroz).toBeTruthy();
        expect(result).not.toBe(array);
        expect(result.length).toBe(array.length);
        expect(result[0]).toBe('A');
        expect(result[1]).toBe('B');
        expect(result[2]).toBe('C');

        for (var i = 0; i < indexes.length; i++)
            expect(indexes[i]).toBe(i);

        for (var i = 0; i < arrays.length; i++)
            expect(arrays[i]).toBe(array);

        // check original array hasn't been manipulated
        expect(array[0]).toBe('a');
        expect(array[1]).toBe('b');
        expect(array[2]).toBe('c');

        // or this way
        ['a', 'b', 'c'].forEach(function (element, index) {
            expect(array[index]).toEqual(element);
        });

        // or this other way
        expect(array).toEqual(jasmine.objectContaining({
            0: 'a',
            1: 'b',
            2: 'c'
        }));
    });

    it('should throw error on non-function expression', function () {
        var array = new Arroz(1, 2, 3);
        var result;

        try {
            array.map();
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('undefined is not a function');

        result = undefined;

        try {
            array.map(1);
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('1 is not a function');

        result = undefined;

        try {
            array.map(true);
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('true is not a function');
    })
});