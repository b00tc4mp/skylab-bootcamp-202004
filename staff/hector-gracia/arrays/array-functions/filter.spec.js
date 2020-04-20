describe('filter', function () {
    it('should create a new array with all elements that pass the test implemented by the provided function', function () {
        var array = [1, 2, 3, 4];
        
        var filtred=[];
        filtred=filter(array,function(value){return value>2});
        expect(filtred[0]).toBe(3);
        expect(filtred[1]).toBe(4);
    });
    it('should not change the array that is being filtered', function () {
        var array = [1, 2, 3, 4];
        
        var filtred=[];
        filtred=filter(array,function(value){return value>2});
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
    });
});