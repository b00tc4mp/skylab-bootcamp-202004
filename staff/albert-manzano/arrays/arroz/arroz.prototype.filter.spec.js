'use strict'

describe('Arroz.prototype.filter', function() {
    it('This method creates a new array with all elements that matches the test implemented by the provided function.', function() {
        var input = new Arroz (1, 2, 3, 4, 5);

        var result = input.filter(function(element) {
            return element < 3
        });

        expect(input instanceof Arroz).toBeTruthy();
        expect(result instanceof Arroz).toBeTruthy();
        expect(result[1]).toBe(2);
    });

    it('shall return the index and the element', function() {
        var input = new Arroz (1, 2, 3, 4, 5);


        var result = input.filter(function(element) {
            return element > 3
        });

        expect(input instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        
    });

    it('shall return the index and the element', function() {
        var array = new Arroz(1, 2, 3, 4 ,5);


        var result = array.filter(function(element, index, array) {
            return element > index;
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});
