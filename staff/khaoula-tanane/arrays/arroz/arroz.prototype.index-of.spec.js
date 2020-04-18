'use strict';

describe('Arroz.prototype.indexOf', function() {

    it('should return position if element is found', function(){
        var names = new Arroz('manel', 'juan', 'alex');
        var  position = names.indexOf("juan");
        expect(position).toBe(1);
    })


    it('should return -1 it is not found', function(){
        var names = new Arroz('manel', 'juan', 'alex');
        var  position = names.indexOf("lucrecia");
        expect(position).toBe(-1);
    })

    it('it should search for item from specified position', function(){
        var names = new Arroz('manel', 'juan', 'alex', 'jorge', 'manel', 'fatima');
        var  position = names.indexOf("manel", 3);
        expect(position).toBe(4);
    })

    it("should fail when element passed is not defined", function(){
        
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        
        expect(function(){
           names.indexOf();                 
        }).toThrowError(TypeError, "search value is required");
        
    })

}) 