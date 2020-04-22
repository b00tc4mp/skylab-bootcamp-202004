'use strict';

describe('ArrozConLeche', function () {
    it('should instanciate an Arroz with length 0 on no arguments', function () {
        var array = new ArrozConLeche();

        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array.length).toBe(0);

        array = new ArrozConLeche(new Arroz(1, 2, 3));

        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array.length).toBe(1);
        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe(2);
        expect(array[0][2]).toBe(3);
    });

    it('should return an error saying <argument> is not an Arroz', function() {
        
        try {
            var array = new ArrozConLeche(undefined);
        } catch (error) {
            var result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('undefined is not an Arroz');

        try {
            array = new ArrozConLeche(1);
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('1 is not an Arroz');

        try {
            array = new ArrozConLeche([]);
        } catch (error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe(' is not an Arroz');
    });
});