'use strict';

describe('Arroz', function () {
    it('should instanciate an Arroz with length 0 on no arguments', function () {
        var array = new Arroz();

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(0);
    });

    it('should instanciate an Arroz with length 3 on 1,2,3 arguments', function () {
        var array = new Arroz(1, 2, 3);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(3);
    });

    it('should instanciate an Arroz with length 10 on one numeric arguments with value 10', function () {
        var array = new Arroz(10);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(10);

        var keys = Object.keys(array);
        expect(keys.length).toBe(0);
    });
});