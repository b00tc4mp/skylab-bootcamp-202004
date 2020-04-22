"use strict"
describe("The some method", function () {
    it("returns true if an element in the provided array satisfies the provided testing function", function () {
        var array = new Arroz(5, 12, 8, 130, 44);

        var result = array.some(function(element) {
            return element > 10
        });

        expect(result).toBe(true);
    });

    it("returns false if no elements in the provided array satisfy the provided testing function", function () {
        var array = new Arroz(5, 12, 8, 130, 44);
        var result = array.some(function (element) {
            element > 200
        });

        expect(result).toBe(false);
    });

    it("returns false if the length of the array is 0", function () {
        var array = new Arroz();
        var result = array.some(function (element) {
            element > 0
        });

        expect(result).toBe(false);
    });

    it("The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. ", function () {
        var array1 = new Arroz(1, 2, 3, 4);
        var array2 = []
        var result1 = array1.some(function (element) {
            return element === 3
        }, );
        var result2 = array2.some(function (element) {
            return element === 5
        }, 10);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });

    it("The some() Errors", function () {
        var array = new Arroz();
        var resultError = undefined;

        try {
            array.some();
        } catch (error) {
            resultError = error
        }

        expect(resultError).toBeDefined();
        expect(resultError instanceof TypeError).toBeTruthy();
        expect(resultError.message).toBe("undefined is not a function");

        var array = new Arroz(1, 2, 3, 4);
        var resultError = undefined;

        try {
            array.some("hola mundo");
        } catch (error) {
            resultError = error
        }

        expect(resultError).toBeDefined();
        expect(resultError instanceof TypeError).toBeTruthy();
        expect(resultError.message).toBe("hola mundo is not a function");
    });

});