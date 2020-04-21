'use strict'


describe("Arroz.prototype.includes", function () {

    it("should return the value of the first coincidence of the function conditions", function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var array2 = new Arroz(20, 2, 40, 58);

        var a = array.find(function (element, index, array) {
            return element > 4;
        });
        var b = array2.find(function (element, index, array) {
            return element === 58;
        })

        expect(a).toBe(5);
        expect(b).toBe(58);
    });

    it("it has to return undefined because it can't find any value with the conditions of the callback function", function () {

        var array = new Arroz('hola', 'mundo', 'como', 'estas', '?');
        var array2 = new Arroz(20, 2, 40, 58);

        var a = array.find(function (element, index, array) {
            return element === 'pepito';
        });
        var b = array2.find(function (element, index, array) {
            return element === 'sergi';
        })

        expect(a).toBe(undefined);
        expect(b).toBe(undefined);
    });




    it("should throw TypeError is not a function", function () {

        var array = new Arroz(1,2,3,4,5);
        

        expect(function (){
            array = array.find();
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function (){
            array = array.find(28);
        }).toThrowError(TypeError, '28 is not a function');
        expect(function (){
            array = array.find('hola');
        }).toThrowError(TypeError, 'hola is not a function');
    });
});