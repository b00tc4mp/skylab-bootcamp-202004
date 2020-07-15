'use strict';

describe('Arroz.prototype.sort', function () {
    it('sorts the original arroz using the introduced expression', function () {
        var array = new Arroz(5, 4, 3, 2, 1);
        
        array.sort(function(a, b){return a-b});

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });

    it('default expression compares the utf values of the stringified version of each element', function () {
        var array = new Arroz(5, 4, 3, 2, 1);
        
        array.sort();

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

        array = new Arroz(55, 4, 3, 25, 15);
        array.sort();

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(15);
        expect(array[1]).toBe(25);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(55);
    });

    it(`best case complexity is n (number of cumparisons, which is  array.length-1) 
    and worst case complexity is n*(n+1), which is (array.length-1)*array.length`, function () {
        
        var array = new Arroz(5, 4, 3, 2, 1);//Maximum complexity when values are in the opposite order
        var count = 0;

        array.sort(function(a, b){
            count ++;
            return a-b
        });

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(count).toBe((array.length-1)*array.length)

        var array = new Arroz(1, 2, 3, 4, 5); //Minimum complexity when values are in order
        var count = 0;

        array.sort(function(a, b){
            count ++;
            return a-b
        });

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(count).toBe(array.length-1)
    });

    it('handle error input for non-function expressions', function () {
        

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.sort(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.sort('Fulanito');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.sort([]);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.sort({gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });

});