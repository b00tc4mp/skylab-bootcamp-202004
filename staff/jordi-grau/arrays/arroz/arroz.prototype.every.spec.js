'use strict'

describe('arroz.prototype.every', function () {
    it('delete the last index position of one array', function () {
        var array = new Arroz(1,2,3,4,5,6,7);

        var result1 = array.every(function(element){
            return element < 8
        })
        var result2 = array.every(function(element){
            return element > 8
        })

        expect(result1).toBe(true)
        expect(result2).toBe(false)
       
    
    });
    it('should show the value of the last position of one array as a variable', function(){
        var array = new Arroz('hola','hola','hola','hola');

        var result1 = array.every(function(element){
            return element === 'hola';
        })
        var result2 = array.every(function(element){
            return typeof element === 'string';
        })
       expect(result1).toBe(true)
        expect(result2).toBe(true)
     });
});
