'use strict'

describe('arroz.prototype.reduce', function() {
    it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
        var array1 = new Arroz(1, 2, 3, 4);
        var array2=[]
        var result1 = array1.reduce(function(acc, cur) {
            return acc + cur
        }, );
        var result2 = array1.reduce(function(acc, cur) {
            return acc + cur
        }, 10);
       


        expect(result1).toBe(10);
        expect(result2).toBe(20);

    
       try {
           var result3 = array1.reduce("i'm not a function")
           
       } catch (error) {
           result3 = error
           
       }
        expect(result3.message).toBe("expression is not a function");

    })
});