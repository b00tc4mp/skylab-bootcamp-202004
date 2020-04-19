"use strict";

describe('Arroz.prototype.find', function () {
    it('The find() method returns the value of the first element in the provided array that satisfies the provided testing function', function () {
        var array = new Arroz(1,2,3,4,8,9,10);

        var result1 = array.find(function(element){
            return element  > 4 
        })
        var result2 = array.find(function(element){
            return element < 5
        })

        expect(result1).toBe(8)
        expect(result2).toBe(1)
       
    
    });
    it('The find() test legth of string', function(){
        var array = new Arroz('hola','que','Sergio','Jordi');

        var result1 = array.find(function(element){
            return element.length < 5;
        })
        var result2 = array.find(function(element){
            return element.length > 10;
        })
        expect(result1).toBe('hola')
        expect(result2).toBe(undefined)
     });
     it('The find() test index', function(){
        var array = new Arroz(1,2,3,4,5,6);
        var cont = 0
        var result = array.find(function(element, index, array){
            expect(index).toBe(cont++)
            return element > 3;
        })
        expect(cont).toBe(4)
    
     });
     it('The find() errors with a expression diferent', function(){
        var array = new Arroz(1,2,3,4,5,6);
  
        expect(function(){
            array.find();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function(){
            array.find('hello');
        }).toThrowError(TypeError, 'hello is not a function');

        expect(function(){
            array.find(23);
        }).toThrowError(TypeError, '23 is not a function');
    
     });
});