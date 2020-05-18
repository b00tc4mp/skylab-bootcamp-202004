describe('find-index', function () {
    it('should the first element complying with the condition', function () {
        var arr = [1,4,62,52,5,12];
        
        var result = findIndex(arr, function(element){
            return element > 15;
        });
        
        expect(result).toBe(2);
        
        
    });
    
    it('should the first element complying with the condition', function () {
        var arr = ["alberto","kau","marc","estivi","hector"];
        
        var result = findIndex(arr, function(element){
            return element.length < 4 ;
        });  

        expect(result).toBe(2);
        
    });
    
    
});