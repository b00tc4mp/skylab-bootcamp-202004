'use strict';

describe('Arroz.prototype.find', function() {

    it('should find first element that passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        var found = names.find(function(name){
            return name.length === 4;
        })
        expect(found).toBe('alex');
    })

    it('should return undefined when no passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
        var found = names.find(function(name){
            return name.length === 8;
        })
        expect(found).not.toBeDefined();
    })

   /* it('should fail when callback is not a function (try catch)', function(){
        
        try{
            var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
            names.find()
        }catch(error){
            expect(error.message).toBe('undefined is not a function');
        }

    })
*/
it("should fail when callback is not a function", function(){
        
    var names = new Arroz('manuel', 'juanito', 'alex', 'kaula');
    
    expect(function(){
       names.find();                 
    }).toThrowError(TypeError, "undefined is not a function");
    
});

}) 

