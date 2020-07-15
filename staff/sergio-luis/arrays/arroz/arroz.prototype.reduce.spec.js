"use strict"

describe('Arroz.prototype.reduce', function() {
    it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
        var array = new Arroz(1, 2, 3, 4);

        var result1 = array.reduce(function(acc, cur) {
            return acc + cur
        }, );
        var result2 = array.reduce(function(acc, cur) {
            return acc + cur
        }, 10);

        expect(result1).toBe(10);
        expect(result2).toBe(20);
    });
    it('The reduce() Errors', function() {
        var array = new Arroz();


        expect(function(){
            array.reduce(function(acc, cur) {
                return acc + cur;
            });
        }).toThrowError(TypeError, 'Reduce of empty array with no initial value at Arroz.reduce');
  
        var array = new Arroz(1,2,3,4);
        
        expect(function() {
            array.reduce();
        }).toThrowError(TypeError, 'undefined is not a function');

        var array = new Arroz(1,2,3,4);

        expect(function() {
            array.reduce('hello');
        }).toThrowError(TypeError, 'hello is not a function');
    });
});