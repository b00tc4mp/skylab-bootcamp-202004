describe('find', function () {
    it('should the first element complying with the condition', function () {
        var arr = [1,4,62,52,5,12];
        
        var result = find(arr, function(element){
            return element > 15;
        });
        
        expect(result).toBe(62);
        
        
    });
    
    it('should the first element complying with the condition', function () {
        var arr = ["alberto","kau","marc","estivi","hector"];
        
        var result = find(arr, function(element, i, array){
            return element.length < 5 ;
        });  

        expect(result).toBe("kau");
        
    });
    
    
});