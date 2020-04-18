'use strict';

describe('Arroz.prototype.some', function() {

    it('should return true some elements pass the condition', function(){
        var ages = new Arroz({age: 12}, {age: 13}, {age: 15}, {age: 18});
        var someAdult = ages.some(function({age}){
            return age >= 18;
        })
        expect(someAdult).toBe(true);
    })

    it('should return false when udefined', function(){
        var ages = new Arroz({age: 12}, {age: 13}, {age: 15});
        var someAdult = ages.some(function({age}){
            return age >= 18;
        })
        expect(someAdult).toBe(false);
    })

   /*
    it('should fail when callback is not a function (try catch)', function(){
            
        try{
            var ages = new Arroz({age: 12}, {age: 13}, {age: 15}, {age: 18});
            var someAdult = ages.some();  
        }catch(error){
            expect(error.message).toBe('undefined is not a function');
        }
    }) */

    it("should fail when callback is not a function", function(){
            
        var ages = new Arroz({age: 12}, {age: 13}, {age: 15}, {age: 18});
        
        expect(function(){
        ages.some();                 
        }).toThrowError(TypeError, "undefined is not a function");
        
    });


})
