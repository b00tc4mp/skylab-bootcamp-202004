'use strict';

describe('Arroz.prototype.filter', function() {
    it("should return an array with numbers that are below 15", function() {
        var  numArr = new Arroz(1, 22, 13, 17, 19, 15);

        var result = numArr.filter(function (x) {
            return x < 15;
        });

        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(13);

    });


    it("should return an array with words that have 4 letters or more", function() {

        var strArray = new Arroz("alejandro", "cris", "pol", "ana", "marc", "fer", "lua");

        var result = strArray.filter(function(x) {
            return x.length >= 4;  
        });

        expect(result[0]).toBe("alejandro");
        expect(result[1]).toBe("cris");
        expect(result[2]).toBe("marc");
        
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        array.filter(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        array.filter(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

    it('try to verify that no function argument throws the next error \' <arguments> is not a function\'', function () {
        var array = new Arroz(1, 2, 3);

        expect(function() {
            array.filter()
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() {
            array.filter(1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function() {
            array.filter(true);
        }).toThrowError(TypeError, 'true is not a function');
    
    });
});