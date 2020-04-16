'use strict';

describe('Arroz.prototype.pop', function() {

    it('should delelte the last element of an array', function(){
        var numbers = new Arroz(1,3,4,6);
        numbers.pop();
        expect(numbers.length).toBe(3);
    })

    it('should return the deleted element from array', function(){
        var numbers = [1,3,4,6];
        var lastOne = numbers.pop();
        expect(lastOne).toBe(6); 
    })


}) 