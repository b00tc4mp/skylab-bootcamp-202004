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

    it('should instanciate an Arroz with length 1 with the value specified in the argument', function () {
        var array = new Arroz('1');

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(1);
        expect(array[0]).toBe('1');
    });

    it('should create an arroz with the length specified as a unique argument (an integer)', function () {
        var array = new Arroz(10);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(10);
    });

    it('should return an error creating an arroz using as unique argument a not integer number', function() {

        expect(function(){
            var array = new Arroz(3.3)
        }).toThrowError(ReferenceError, 'Invalid arroz length');
    });
});