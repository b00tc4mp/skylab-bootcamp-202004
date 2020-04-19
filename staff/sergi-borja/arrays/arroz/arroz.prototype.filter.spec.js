'use strict';

describe('Arroz.prototype.filter', function() {
    it('should return an array with the string elements longer than 8', function() {
        var array = new Arroz('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');

        var expression = function(element){
            return element>8;
        }
        
        var result = array.filter(expression);

        expect(result.length).toBe(2);
        expect(array.length).toBe(6);
    });

    it('should return an array with the number elements longer than 8', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9);

        var expression = function(element){
            return element>8;
        }
        
        var result = array.filter(expression);

        expect(result.length).toBe(1);
        expect(array.length).toBe(9);
    });

    it('should catch the error', function() {
        var array = new Arroz('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        var result;

        try{
        array.filter('hola');
        } catch(error){
        result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('hola is not a function!')
    });
});