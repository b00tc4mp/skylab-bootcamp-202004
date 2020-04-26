'use strict';

describe('Arroz.prototype.map', function() {
    it('should iterate on each element and return  a new instance with each value multiplied by 10', function() {
        var array = new Arroz(1, 2, 3);


        var result = array.map(function(element) {
            return element * 10;
        });

        expect(result).not.toBe(array);
        expect(result.length).toBe(array.length);

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);


    });
    it('should return error because dont have an valid argument', function() {
        var array = new Arroz(1, 2, 3);
        var result;

        try {
            result = array.map();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("expresion is not a function");
    });
});