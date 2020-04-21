'use strict'

describe('arroz.prototype.every', function () {
    it('', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var arrayString = new Arroz('hola','mundo')

        var boolean = array.every(function (element, index, array) {
            return element < 8;
        });
        var boolean2 = array.every(function (element, index, array) {
            return element < 2;
        });
        var boolean3 = array.every(function (element, index, array) {
            return element > 0;
        });
        var boolean4 = array.every(function (element, index, array) {
            return element < 0;
        });
        var boolean5 = arrayString.every(function (element, index, array) {
            return element === 'hola';
        });
        var boolean6 = arrayString.every(function (element, index, array) {
            return element.length >= 4;
        });

        expect(boolean).toBe(true);
        expect(boolean2).toBe(false);
        expect(boolean3).toBe(true);
        expect(boolean4).toBe(false);
        expect(boolean5).toBe(false);
        expect(boolean6).toBe(true);
    });

    it('should throw TypeError is not a function', function () {

        var array = new Arroz(1, 2, 3, 4);     
     
        expect(function(){
            var boolean = array.reduce('hola');
        }).toThrowError('hola is not a function');
        expect(function(){
            var boolean1 = array.reduce(10);
        }).toThrowError('10 is not a function');
        expect(function(){
            var boolean2 = array.reduce(true);
        }).toThrowError('true is not a function');
        expect(function(){
            var boolean3 = array.reduce();
        }).toThrowError('undefined is not a function');
     
    });
});