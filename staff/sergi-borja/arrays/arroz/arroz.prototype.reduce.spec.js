'use strict';

describe('Arroz.prototype.reduce', function() {
    it('Should reduce the array numbers into an adding between them all', function() {
        var array = new Arroz(1,2,3,4,5);
        var sum=0;
        var expression = function(element){
            return sum += element;
        }
        var result= array.reduce(expression);

        expect(result).toBe(15);
    });

    it('Should reduce the array numbers into an adding between them all, having as the first place of the array, a 5', function() {
        var array = new Arroz(1,2,3,4,5);
        var sum=0;
        var expression = function(element){
            return sum += element;
        }
        var result= array.reduce(expression, 5);

        expect(result).toBe(19);
    });

    it('should catch the error', function() {
        var array = new Arroz(1,2,3,4,5);
        var result;

        try{
        array.reduce('hola');
        } catch(error){
        result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('hola is not a function!')
    });

});