'use strict';

describe('Arroz.prototype.splice', function () {
    it(' insert elements without removing elements from array' , function () {
        
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        numbers.splice(2, 0, 3);


        expect(numbers[2]).toBe(3);
        expect(numbers[3]).toBe(4);
        expect(numbers.length).toBe(7);
        expect(numbers instanceof Arroz).toBeTruthy();

    });

    it('Insert elements y remove elements from the array' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);

        numbers.splice(2, 2);


        expect(numbers[2]).toBe(6);
        expect(numbers[3]).toBe(7);
        expect(numbers.length).toBe(4);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('if the start is negative, start = array.length-(start in absolute value)' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(-1, 1);

        expect(numbers[4]).toBe(6);
        expect(numbers.length).toBe(5);
        
        //Also if start is negative and its absolute value is higher than array.length, start becomes 0
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(-7, 1);

        expect(numbers[1]).toBe(4);
        expect(numbers.length).toBe(5);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('with negative starting point, the function can still add elements to the array' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(-1, 1, 7);

        expect(numbers[5]).toBe(7);
        expect(numbers.length).toBe(6);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('if no deleteCount is introduced, all elements after the start point are deleted' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(2);

        expect(numbers[1]).toBe(2);
        expect(numbers.length).toBe(2);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('adds the element to the end if start is higher than the length of the array' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(7, 0, 8);

        expect(numbers[6]).toBe(8);
        expect(numbers.length).toBe(7);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('add any amount of elements introduced in the function after array, start and end' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(3, 0, 2, 5, 6, 7, 8);

        expect(numbers.length).toBe(11);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('if deleteCount is negative, deleteCount becomes 0' , function () {
        var numbers = new Arroz( 1, 2, 4, 5, 6, 7);
        
        numbers.splice(3, -3);

        expect(numbers.length).toBe(6);
        expect(numbers instanceof Arroz).toBeTruthy();
    });

    it('handle error input', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter(1, );
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter('hello');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter(1, 'hello');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter([]);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter(1 , []);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter({gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter(1 ,{gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });
});