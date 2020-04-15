describe('find-index', function () {
    it('should return the first element of the array that suits the requirement', function () {
        var array = [1,2,3,4,5]
        var result= findIndex(array, function(element,index,array){return element>3})

        expect(result).toBe(3);
    });
    it('should not change the array', function () {
        var array = [1,2,3,4,5]
        var result= findIndex(array, function(element,index,array){return element>3})

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });
});