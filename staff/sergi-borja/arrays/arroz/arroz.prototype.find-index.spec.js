'use strict';

describe('Arroz.prototype.find-index', function() {
    it('should return the index of first num of the array bigger than 5', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
        var expression = function(element){
            return element>5;
        }
        var result= array.findIndex(expression);

        expect(result).toBe(5);
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