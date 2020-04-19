'use strict';

describe('Arroz.prototype.join', function() {
    it('Should put together the elements of the array, if you write a parameter, the parameter will be between the elements, otherwise, a "," will be between them', function() {
        var array = new Arroz(1,2,3,4,5,6);
        
        var result= array.join();

        expect(result).toBe('1,2,3,4,5,6');
        expect(array.length).toBe(6)
    });

    it('Should put together the elements of the array, if you write a parameter, the parameter will be between the elements, otherwise, a "," will be between them', function() {
        var array = new Arroz(1,2,3,4,5,6);
        
        var result= array.join('-');

        expect(result).toBe('1-2-3-4-5-6');
        expect(array.length).toBe(6)
    });

    it('Should put together the elements of the array, if you write a parameter, the parameter will be between the elements, otherwise, a "," will be between them', function() {
        var array = new Arroz('Fire', 'Air', 'Water');
        
        var result= array.join('9');

        expect(result).toBe('Fire9Air9Water');
        expect(array.length).toBe(3)
    });
});