'use strict'

describe('arroz.prototype.filter', function () {
    it('it should return an array with all the elements that pass the condition of the callback function', function () {
       
       
        var array = new Arroz(1, 2, 3, 4, 5, 18);

        var array2 = array.filter(function (element, index, array) {
            return element > 2;
        });
        
        expect(array2[0]).toBe(3);
        expect(array2[1]).toBe(4);
        expect(array2[2]).toBe(5);
        expect(array2[3]).toBe(18);
    });
    

    it('it should return an empty array because we not pass any element in callback function', function () {
       
       
        var array = new Arroz(1,2,3,4,5);

        var array2 = array.filter(function (element, index, array) {
            return element > 10;
        })
        expect(array2).toEqual([]);
        expect(array2.length).toBe(0);
    });


    it('should throw TypeError is not a function', function () {
       
        var array = new Arroz(1,2,3,4,5);
        
        expect(function () {
            var array2 = array.filter();
        }).toThrowError(TypeError,'undefined is not a function');
        expect(function () {
            var array2 = array.filter(1);
        }).toThrowError(TypeError,'1 is not a function');
        expect(function () {
            var array2 = array.filter('hola mundo');
        }).toThrowError(TypeError,'hola mundo is not a function');
        expect(function () {
            var array2 = array.filter(true);
        }).toThrowError(TypeError,'true is not a function');
        
    });



});








