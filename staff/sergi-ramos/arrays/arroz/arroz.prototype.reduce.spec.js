'use strict'

describe('arroz.prototype.reduce', function () {
    it('should add all the numbers in an array with an accumulator', function () {

        var array = new Arroz(1, 2, 3, 4);
        var array2 = new Arroz('hola', 'mundo', 'pepito', '!');

        var accumulator = array.reduce(function (acc, currentVal) {
            return acc + currentVal
        });
        var accumulator2 = array.reduce(function (acc, currentVal) {
            return acc + currentVal
        }, 10);
        var accumulator3 = array2.reduce(function (acc, currentVal) {
            return acc + currentVal
        }, '¡');

        expect(accumulator).toBe(10);
        expect(accumulator2).toBe(20);
        expect(accumulator3).toBe('¡holamundopepito!');
    });

    it('should throw TypeError is not a function and Reduce of empty array with no initial value', function () {

        var array = new Arroz(1, 2, 3, 4);     
        var emptyArray = new Arroz();
     
        expect(function(){
            var accumulator = array.reduce('hola');
        }).toThrowError('hola is not a function');
        expect(function(){
            var accumulator = array.reduce(10);
        }).toThrowError('10 is not a function');
        expect(function(){
            var accumulator = array.reduce(true);
        }).toThrowError('true is not a function');
        expect(function(){
            var accumulator = array.reduce();
        }).toThrowError('undefined is not a function');
        expect(function(){
            var accumulator = emptyArray.reduce(function (acc, currentVal) {
                return acc + currentVal
            });
        }).toThrowError('Reduce of empty array with no initial value');
        
    });
});



