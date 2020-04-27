"use strict"

describe('some', function() {
    it('The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. ', function() {
        var array1 = new Arroz (1, 2, 3, 4);
        var array2=[]
        var result1 = array1.some(function(element) {
           return element === 3
        }, );
        var result2 = array2.some(function(element) {
            return element === 5
        }, 10);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });
    
    it('The some() Errors', function() {
        var array = new Arroz();
        var resultError = undefined;

        try {
            array.some();
        } catch (error) {
            resultError = error
        }

        expect(resultError).toBeDefined();
        expect(resultError instanceof TypeError).toBeTruthy();
        expect(resultError.message).toBe('undefined is not a function');

        var array = new Arroz(1,2,3,4);
        var resultError = undefined;

        try {
            array.some('hola mundo');
        } catch (error) {
            resultError = error
        }

        expect(resultError).toBeDefined();
        expect(resultError instanceof TypeError).toBeTruthy();
        expect(resultError.message).toBe('hola mundo is not a function');
    });

    
});