describe('push', function () {
    it('it should put in the array any type of data that you pass as a parameter to the method', function () {
        var array = [];
    
        push(array, 2);
        expect(array[0]).toBe(2);  
    });

    it('should put in the array if we add more than one data as parameter to the method', function () {
            
            var array = [1, 2]
            push(array, 'pepito', 4)
            expect(array).toEqual([1, 2, "pepito", 4]);        
        });
})
