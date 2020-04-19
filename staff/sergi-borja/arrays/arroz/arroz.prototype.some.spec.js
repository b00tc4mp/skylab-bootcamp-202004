'use strict';

describe('Arroz.prototype.some', function() {
    it('should return true if at least one of the array elements accomplish the condition', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
        var expression = function(element){
            return element>5;
        }
        var result= array.some(expression);

        expect(result).toBeTruthy();
    });

    it('should catch the error', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
        var result;

        try{
        array.find('expression');
        } catch(error){
        result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('String is not a function!')
    });

    it('should catch the error', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
        var result;

        try{
        array.find();
        } catch(error){
        result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('Undefined is not a function!')
    });

});