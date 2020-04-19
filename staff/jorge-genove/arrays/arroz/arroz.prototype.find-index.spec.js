'use strict'

describe('Arroz.prototype.findIndex', function () {
    it('It must iterate throw the whole array and return the first index that match', function () {
        var array = new Arroz(1, 2, 3,5,6);
       

        var result = array.findIndex(function(element) {
           return element  < 3
        });

        expect(result).toBe(0);
    });

     it('if one don\'t match it will return -1', function () {
        var array = new Arroz(1,2,3,4);
        

       var result = array.findIndex(function(element) {
            return element > 8
        });

        expect(result).toBe(-1);
        
    });

    it('return the index of the element finded', function(){
        var array = new Arroz( 'hola', 'pepito', 'deepclone')
        

        

        var result1 = array.findIndex(function(element){
            return element === 'deepclone';
        })
        var result2 = array.findIndex(function(element){
            return typeof element === 'string';
        })
        expect(result1).toBe(2)
        expect(result2).toBe(0)
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

    })
    });