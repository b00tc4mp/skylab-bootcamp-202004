'use strict';

describe('Arroz con leche', function () {
    it('should instanciate an Arroz with length 0 on no arguments', function () {
        var array = new ArrozConLeche();

        expect(array instanceof ArrozConLeche).toBeTruthy();
        expect(array.length).toBe(0);
    });

    it('should instanciate an Arroz with length 3 agrguments with each 1,2,3 arguments', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz(1, 2, 3), new Arroz(1, 2, 3));

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(3);
    });
});