describe('pop', function(){
    it('should return the last item ', function(){
        var array = [2,4,6];
        var result = pop(array);
    
        expect(result).toBe(6);
        });
      
    it('should delete last item', function(){
    var array = [2,4,6];
    var result = pop(array);
            
        expect(array.length).toBe(2);
            
        });
    it('If pop () is called on an empty array, it returns undefined', function(){
        var array = [];
        var result = pop(array);
                    
            expect(result).toBe(undefined);
                    
        });
    
    });