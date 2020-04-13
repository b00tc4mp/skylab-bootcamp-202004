describe('filter', function () {
    it('should create a new array with all elements that pass the test implemented by the provided function', function () {
        var array = [1, 2, 3, 4];
        debugger
        
        var filtred=[];
        function bigger(value){
            return value>2;
        }
        filtred=filter(array,bigger);
        function bigger(value,index,array,thisArg){
            return value>2;
        }
        expect(filtred[0]).toBe(3);
        expect(filtred[1]).toBe(4);
    });
    it('should not change the array that is being filtered', function () {
        var array = [1, 2, 3, 4];
        debugger
        
        var filtred=[];
        function bigger(value){
            return value>2;
        }
        filtred=filter(array,bigger);
        function bigger(value,index,array,thisArg){
            return value>2;
        }
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
    });
});