'use strict';

describe('Arroz.prototype.slice', function() {

    it('should return an new array with sliced elments', function(){
        var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana')
        var selectedFruits = fruits.slice(1, 3)
        expect(selectedFruits.length).toBe(2)
        expect(selectedFruits[0]).toBe('orange')
        expect(selectedFruits[1]).toBe('pineapple')

    })

    /*it('should fail when start is not a number', function(){
        
        try{
            var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana');
            fruits.slice()
        }catch(error){
            expect(error.message).toBe('undefined is not a number');
        }
    })

    it('should fail when end is not a number', function(){
        
        try{
            var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana');
            fruits.slice(1)
        }catch(error){
            expect(error.message).toBe('undefined is not a number');
        }
    })
    */

   it("should fail when start is not a number", function(){
        
    var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana');
    
    expect(function(){
       fruits.slice();                 
    }).toThrowError(TypeError, "undefined is not a number");
    
    });

    it("should fail when end is not a number", function(){
        
        var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana');
        
        expect(function(){
           fruits.slice(1);                 
        }).toThrowError(TypeError, "undefined is not a number");
        
        });


}) 
