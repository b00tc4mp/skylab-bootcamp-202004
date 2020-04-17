'use strict';

describe('Arroz.prototype.some', function() {
    it(' tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function() {
        var array = new Arroz (1, 2, 3, 4, 5);

        var result =array.some(function(element) {
            return element === 3;
        });

        expect(result).toBe(true);
    });
    it(' tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function() {
        var array = new Arroz (1, 2, 3, 4, 5);
        var result =[];

        array.some(function(element ,index ,array) {
            result[index]= array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
    
    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });
});

