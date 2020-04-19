'use strict'

describe('Arroz.prototype.splice', function () {
    it('it should keep in array first tree elements and it should put the rest of elements in arr', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(3);

        expect(arr instanceof Arroz).toBeTruthy();
        expect(arr.length).toBe(4);
        expect(arr[0]).toBe(4);
        expect(arr[1]).toBe(5);
        expect(arr[2]).toBe(6);
        expect(arr[3]).toBe(7);
        expect(array.length).toBe(3);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(undefined);
        expect(array[4]).toBe(undefined);
        expect(array[5]).toBe(undefined);
        expect(array[6]).toBe(undefined);
    });

    it('it should extract thee elements from the end and keep four first element in the origin array', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(-3);

        expect(arr.length).toBe(3)
        expect(arr[0]).toBe(5);
        expect(arr[1]).toBe(6);
        expect(arr[2]).toBe(7);
        expect(array.length).toBe(4);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(undefined);
        expect(array[5]).toBe(undefined);
        expect(array[6]).toBe(undefined);
    });

    it('it should provide the empty array and keep the origin array', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(-10);

        expect(arr.length).toBe(7);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
        expect(arr[2]).toBe(3);
        expect(arr[3]).toBe(4);
        expect(arr[4]).toBe(5);
        expect(arr[5]).toBe(6);
        expect(arr[6]).toBe(7);
        expect(array.length).toBe(0);
        expect(array[0]).toBe(undefined);
        expect(array[1]).toBe(undefined);
        expect(array[6]).toBe(undefined);
    });

    it('it should provide a new array with all elements from origin array and origin array empty', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(20);

        expect(arr[0]).toBe(undefined);
        expect(arr.length).toBe(0);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
        expect(array[6]).toBe(7);
    });

    it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and keep the rest of elements in the origin array', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(2, 2);

        expect(arr.length).toBe(2);
        expect(arr[0]).toBe(3);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(undefined);
        expect(arr[3]).toBe(undefined);
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(5);
        expect(array[3]).toBe(6);
        expect(array[4]).toBe(7);
        expect(array[5]).toBe(undefined);
        expect(array[6]).toBe(undefined);
    });

    it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and insert three new elements into the origin array', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(2, 2, 66,88,99);

        expect(arr.length).toBe(2);
        expect(arr[0]).toBe(3);
        expect(arr[1]).toBe(4);
        expect(arr[2]).toBe(undefined);
        expect(arr[3]).toBe(undefined);
        expect(array.length).toBe(8);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(66);
        expect(array[3]).toBe(88);
        expect(array[4]).toBe(99);
        expect(array[5]).toBe(5);
        expect(array[6]).toBe(6);
        expect(array[7]).toBe(7);

        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(2, 0, 66,88,99);

        expect(arr.length).toBe(0)
        expect(arr[0]).toBe(undefined);
        expect(array.length).toBe(10);
        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
        expect(array[2]).toEqual(66);
        expect(array[3]).toEqual(88);
        expect(array[4]).toEqual(99);
        expect(array[5]).toEqual(3);
        expect(array[6]).toEqual(4);
        expect(array[7]).toEqual(5);
        expect(array[8]).toEqual(6);
        expect(array[9]).toEqual(7);
    });

    it('.it should insert one element in the origin array', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);

        var arr = array.splice(-2, 1, 'hola');

        expect(arr.length).toBe(1);
        expect(arr[0]).toBe(6);
        expect(array.length).toBe(7);
        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
        expect(array[2]).toEqual(3);
        expect(array[3]).toEqual(4);
        expect(array[4]).toEqual(5);
        expect(array[5]).toEqual('hola');
        expect(array[6]).toEqual(7);

        array = new Arroz(1, 2, 3, 4, 5, 6, 7);

        arr = array.splice(-2, 0, 'hola');

        expect(arr.length).toBe(0);
        expect(arr[0]).toEqual(undefined);
        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
        expect(array[2]).toEqual(3);
        expect(array[3]).toEqual(4);
        expect(array[4]).toEqual(5);
        expect(array[5]).toEqual('hola');
        expect(array[6]).toEqual(6);
        expect(array[7]).toEqual(7);
    });

});