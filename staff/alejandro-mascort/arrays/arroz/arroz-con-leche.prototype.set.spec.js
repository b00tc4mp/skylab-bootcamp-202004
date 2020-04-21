'use strict';

describe('ArrozConLeche.prototype.set', function() {
    it('should add a new arroz in the position 3 of the array', function() {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));

        array.set(1, undefined, new Arroz(1, 2, 3));

        expect(array.length).toBe(2);
        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array[1][0]).toBe(1);
        expect(array[1][1]).toBe(2);
        expect(array[1][2]).toBe(3);

    });

    it('should add a new arroz in the position 20 of the array', function() {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));

        array.set(20, undefined, new Arroz(1, 2, 3));

        expect(array.length).toBe(21);
        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array[20][0]).toBe(1);
        expect(array[20][1]).toBe(2);
        expect(array[20][2]).toBe(3);
        expect(array[3]).toBeUndefined();
    });

    it('should add a new element in the position [0][1] of the array', function() {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));

        array.set(0, 1, 'skylab');

        expect(array.length).toBe(1);
        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe('skylab');
        expect(array[0][2]).toBe(3);
        expect(array[3]).toBeUndefined();
    });

    it('should add a new arroz in the position 20 of the array', function() {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));

        array.set(40, undefined, new Arroz());

        expect(array.length).toBe(41);
        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array[40] instanceof Arroz).toBeTruthy();
        expect(array[3]).toBeUndefined();
    });

    it('should return an error saying <argument> is not an Arroz', function() {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));

        try {
            array.set(40, "p", new Arroz());
        } catch (error) {
            var result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('p is not a number');

        try {
            array.set(40, undefined, "p");
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('p is not an Arroz');

        try {
            array.set("p", undefined, "p");
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('p is not a number');
    });
});