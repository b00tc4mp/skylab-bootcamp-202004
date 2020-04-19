'use strict';

describe('Arroz.prototype.filter', function() {
    it('shoult return an array with the string elements longer than 5', function() {
        var array = new Arroz('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        
        var result = array.filter();

        expect(result.length).toBe(3);
        expect(array.length).toBe(6);
    });
});