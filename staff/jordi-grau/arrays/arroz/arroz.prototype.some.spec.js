'use strict'

describe('arroz.prototype.some', function() {
    it('The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. ', function() {
        var array1 = new Arroz(1, 2, 3, 4);
        var array2=[]
        var result1 = array1.some(function(element) {
           return element === 3
        }, );
        var result2 = array1.some( function(element) {
            return element === 5
        }, 10);
        var result3 = array2.some( function(element) {
            return element === 10
        }, );


        expect(result1).toBe(true);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    })
});