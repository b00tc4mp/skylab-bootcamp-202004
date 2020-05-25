'use strict'

describe('arroz.prototype.every', function () {
    it('returns a boolean depending if all elements into an array passes or not a specificatd condition', function () {
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
    it('should return true or false if all elements pass or not a condition ', function(){
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
    it('should return true with an empty array for any condition', function () {         
        var array2 = new Arroz()
        var result3 = array2.every(function(element){
            return typeof element === 'string';
        })
        
        var result4 = array2.every(function(element){
            return typeof element === 'number';
        })
             
        expect(result3).toBe(true);
        expect(result4).toBe(true);

        });
});
