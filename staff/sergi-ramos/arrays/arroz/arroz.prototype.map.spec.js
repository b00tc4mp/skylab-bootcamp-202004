'use strict'

describe("Arroz.prototype.map.js", function () {
    it("should return the operated value in a new array", function () {

        var array = new Arroz(3, 4, 3, 6, 1)
        var array2 = array.map(function (currentValue, index, array) {

            return currentValue * 10
        });

        expect(array2[0]).toBe(30);
        expect(array2[1]).toBe(40);
        expect(array2[2]).toBe(30);
        expect(array2[3]).toBe(60);
        expect(array2[4]).toBe(10);
    });



    it("should return the UPPERCASE value in a new array", function () {

        var array = new Arroz('hola', 'mundo', 'pepito', 'menganito')
        var array2 = array.map(function (currentValue, index, array) {

            return currentValue.toUpperCase();
        });

        expect(array2[0]).toBe('HOLA');
        expect(array2[1]).toBe('MUNDO');
        expect(array2[2]).toBe('PEPITO');
        expect(array2[3]).toBe('MENGANITO');
    });



    it("should throw TypeError is not a function", function () {

        var array = new Arroz(1,2,3,4,5)
        

        expect(function (){
            var array2 = array.map();
        }).toThrowError(TypeError, 'undefined is not a function')
        expect(function (){
            var array2 = array.map(1);
        }).toThrowError(TypeError, '1 is not a function')
        expect(function (){
            var array2 = array.map('hola');
        }).toThrowError(TypeError, 'hola is not a function')
       
    });
});