'use strict'

describe('Arroz.prototype.slice', function () {

    it('it should put in the array from index 2 included', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice(2);

        expect(arr instanceof Arroz).toBeTruthy();
        expect(arr.length).toBe(5);
        expect(arr[0]).toBe(3);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(5);
        expect(arr[3]).toBe(6);
        expect(arr[4]).toBe(7);

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)
    });


    it('it should put in the array from position 3 starting from end', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice(-3);

        expect(arr.length).toBe(3);
        expect(arr[0]).toBe(5);
        expect(arr[1]).toBe(6);
        expect(arr[2]).toBe(7);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
        expect(array[6]).toBe(7);
    });

    it('it should put in the array between index 3 and 5 (both included)', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice(3, -2);
        
        expect(arr.length).toBe(2);
        expect(arr[0]).toBe(4);
        expect(arr[1]).toBe(5);
    });

    it('it should put in the array all elements from original array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice();

        expect(arr.length).toBe(7);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
        expect(arr[2]).toBe(3);
        expect(arr[3]).toBe(4);
        expect(arr[4]).toBe(5);
        expect(arr[5]).toBe(6);
        expect(arr[6]).toBe(7);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
        expect(array[6]).toBe(7);

        array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        arr = array.slice(-10);

        expect(array.length = arr.length).toBeTruthy();
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
        expect(arr[2]).toBe(3);
        expect(arr[3]).toBe(4);
        expect(arr[4]).toBe(5);
        expect(arr[5]).toBe(6);
        expect(arr[6]).toBe(7);

    });

    it('it should return an empty array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice(10);

        expect(arr[0]).toBe(undefined);
        expect(arr.length).toBe(0);

        array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        arr = array.slice(2, -20);

        expect(arr[0]).toBe(undefined);
        expect(arr.length).toBe(0);
    });
   
    it('it should put in the array between two indexes (first included and end excluded)', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);
        var arr = array.slice(2, 6);

        expect(arr.length).toBe(4);
        expect(arr[0]).toBe(3);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(5);
        expect(arr[3]).toBe(6);

        array = new Arroz('maria', 'ana', 'sofia', 'elena');
        arr = array.slice(1, 3);

        expect(arr.length).toBe(2);
        expect(arr[0]).toBe('ana');
        expect(arr[1]).toBe('sofia');

        expect(array[0]).toBe('maria');
        expect(array[1]).toBe('ana');
        expect(array[2]).toBe('sofia');
        expect(array[3]).toBe('elena');
    });

    it('should return a TypeError', function(){
        var array = 2;

        expect(function(){
            array.slice(1,2);
        }).toThrowError(TypeError, 'array.slice is not a function');
    })
})