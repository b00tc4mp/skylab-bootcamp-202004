'use strict';

describe('Arroz.prototype.push', function() {

    it('should add an element to the end of an array', function(){
        var numbers = new Arroz(1,2,3,4,5);
        numbers.push(9);

        expect(numbers.length).toBe(6);
        expect(numbers[5]).toBe(9);
    })

    it('should add multiple arguments to the end of an array', function(){
        var numbers = [];
        numbers.push(1, 2, 3);

        expect(numbers.length).toBe(3);
    } )


}) 