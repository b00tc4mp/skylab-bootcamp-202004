'use strict';

describe('Arroz.prototype.filter', function() {

    it('should return element that passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        var filtrado = names.filter(function(name){
            return name.length === 4;
        })
        expect(filtrado.length).toBe(1);
        expect(filtrado[0]).toBe('alex');
    })

    /*it('should fail when callback is not a function (try catch)', function(){
        
        try{
            var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
            names.filter()
        }catch(error){
            expect(error.message).toBe('undefined is not a function');
        }

    })*/

    it("should fail when callback is not a function", function(){
        
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        
        expect(function(){
           names.filter();                 
        }).toThrowError(TypeError, "undefined is not a function");
        
    });

}) 

