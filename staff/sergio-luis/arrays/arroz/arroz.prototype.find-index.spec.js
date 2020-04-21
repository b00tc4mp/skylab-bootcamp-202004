"use strict"

describe('Arroz.prototype.findIndex', function () {
    it('The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.', function () {
        var array = new Arroz(1,2,3,4,8,9,10);

        var result1 = array.findIndex(function(element){
            return element  > 4; 
        })
        var result2 = array.findIndex(function(element){
            return element < 5;
        })

        expect(result1).toBe(4);
        expect(result2).toBe(0);
       
    
    });
    it('The findIndex() test legth of string', function(){
        var array = new Arroz('hola','que','Sergio','Jordi');

        var result1 = array.findIndex(function(element){
            return element.length < 5;
        })
        var result2 = array.findIndex(function(element){
            return element.length > 10;
        })
        expect(result1).toBe(0);
        expect(result2).toBe(-1);
     });
     it('The findIndex() test index', function(){
        var array = new Arroz(1,2,3,4,5,6);
        var cont = 0
        var result = array.findIndex(function(element, index, array){
            expect(index).toBe(cont++)
            return element > 3;
        })
        expect(cont).toBe(4)
    
     });
     it('The findIndex() test array', function(){
        var array = new Arroz(1,2,3,4,5,6);
        var result2 =[];
        var result = array.findIndex(function(element, index, array){
            result2[result2.length] = array;
            return element > 3;
        })
        expect(result2[0]).toBe(array)
        expect(result2[1]).toBe(array)
        expect(result2[2]).toBe(array)
    
     });
     it('The find() errors with a expression diferent', function(){
        var array = new Arroz(1,2,3,4,5,6);
  
        expect(function(){
            array.findIndex();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function(){
            array.findIndex('hello');
        }).toThrowError(TypeError, 'hello is not a function');

        expect(function(){
            array.findIndex(23);
        }).toThrowError(TypeError, '23 is not a function');
    
     });
});