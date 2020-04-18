'use strict';

describe('Arroz.prototype.findIndexOf', function() {
    

    it('should return position of element that passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        var index = names.findIndexOf(function(name){
            return name.length === 4;
        })
        expect(index).toBe(2);
    })

    it('should return undefined when it does not pass the condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        var index = names.findIndexOf(function(name){
            return name.length === 8;
        })
        expect(index).toBe(-1);
    })

    it("should fail when callback is not a function", function(){
        
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        
        expect(function(){
           names.findIndexOf();                 
        }).toThrowError(TypeError, "undefined is not a function");
        
    });

}) 