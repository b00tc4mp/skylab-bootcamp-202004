'use strict';

describe('Arroz.prototype.splice', function() {

    it('should remove elements from array', function(){
        var letters = new Arroz("a", "b", "c", "d", "k", "m");
        var deleted = letters.splice(1,5);

        expect(deleted.length).toBe(4);
        expect(letters.length).toBe(2);
    })

    it('should remove and replace', function(){
        var letters = new Arroz("a", "b", "c", "d", "k", "m");
        var deleted = letters.splice(1, 5, '*', '__', '*');

        expect(deleted.length).toBe(4);
        expect(letters.length).toBe(5);

    })

   /* it('should fail when start is not a number', function(){
        
        try{
            var letters = new Arroz("a", "b", "c", "d", "k", "m");
            letters.splice()
        }catch(error){
            expect(error.message).toBe('undefined is not a number');
        }
    }) */

    it('should fail when end is not a number', function(){
        
        try{
            var letters = new Arroz("a", "b", "c", "d", "k", "m");
            letters.splice(1)
        }catch(error){
            expect(error.message).toBe('undefined is not a number')
        }
    })


    it("should fail when start is not a number", function(){
        
        var letters = new Arroz("a", "b", "c", "d", "k", "m");
        
        expect(function(){
           letters.splice();                 
        }).toThrowError(TypeError, "undefined is not a number");
        
    });
    

}) 
