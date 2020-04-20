'use strict';

describe('Arroz.prototype.slice', function() {
    it(' This method returns a copy of a portion of an arroz into a new arroz object selected from the start index to the end index. start defaults to 0 and end defaults to arroz.length', function() {
        var array = new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(1,2);
        expect(result[0]).toBe(2);
        
        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(2);
        expect(result[0]).toBe(3);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(5);
        expect(result instanceof Arroz).toBe(true);

        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
        expect(result[4]).toBe(5);
        expect(result instanceof Arroz).toBe(true);
    });

    it('the original arroz is not modified',function(){
        var array = new Arroz (1, 2, 3, 4, 5);
        var result = array.slice(1,2);

        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
        expect(result instanceof Arroz).toBe(true);
        expect(array instanceof Arroz).toBe(true);
    });

    it('if end < start, returns an empty array' , function () {
        var array = new Arroz (1, 2, 3, 4, 5);
        var result = array.slice(2, 1);
        
        expect(result.length).toBe(0);
        expect(result instanceof Arroz).toBe(true);
    });

    it('converts negative start and end values into arroz.length - index. If they are still negative after that, they become 0', function() {
        var array = new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(-4,2);
        expect(result[0]).toBe(2);
        expect(result.length).toBe(1);
        
        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(2, -1);
        expect(result[0]).toBe(3);
        expect(result[1]).toBe(4);
        expect(result.length).toBe(2);
        expect(result instanceof Arroz).toBe(true);

        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(-8);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
        expect(result[4]).toBe(5);
        expect(result instanceof Arroz).toBe(true);

        var array = new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(-4,-2);
        expect(result[0]).toBe(2);
        expect(result.length).toBe(2);

        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(-1, -8);
        expect(result[0]).toBe(undefined);
        expect(result instanceof Arroz).toBe(true);
    });
});