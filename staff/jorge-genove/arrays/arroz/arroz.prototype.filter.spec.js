'use strict';

describe('Arroz.prototype.filter', function () {
    it('It must iterate throw the whole array and return a new array with the elements that are ok', function () {
        var array = new Arroz(1, 2, 3,5,6);
        var result = [];

        var result = array.filter(function(element) {
           return element < 4
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result).toEqual([1,2,3])
    });

     it('if no matches nothing it will return a empty array', function () {
        var array = new Arroz(1,2,3,4);
        var result = [];

        array.filter(function(element) {
            return element > 8
        });

        expect(result.length).toBe(0);
        expect(result).toEqual([])
        
    });

    it('if you pass an empty array it should return an empty array', function(){
        var array = new Arroz()
        var result =[]

        array.filter(function(element){
            return element === 8

        });
        expect(result.length).toBe(0)
        expect(result).toEqual([])
    });
});


it('If you dont declare a callback typeError:not a function must alert the user', function(){
    var array= new Arroz(1,2,4)
    
    expect(function () {
        array.every();
      }).toThrowError(TypeError, "undefined is not a function");
      expect(function () {
        array.every(1);
      }).toThrowError(TypeError, "1 is not a function");
      expect(function () {
        array.every(false);
      }).toThrowError(TypeError, "false is not a function");

});

