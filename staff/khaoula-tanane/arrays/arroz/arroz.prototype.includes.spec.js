'use strict';

describe('Arroz.prototype.includes', function() {

    it('should return true  if it is available', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        var included = names.includes("juanito")
        expect(included).toBe(true)
    })

    it('should return false  if it is available', function(){
        var names = new Arroz('manuel', 'alex', 'kaula')
        var included = names.includes("juanito")
        expect(included).toBe(false)
    })


    it("should fail when there is no element provided", function(){
        
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        
        expect(function(){
            names.includes()
        }).toThrowError(TypeError, "undefined is required");
        
    });

}) 