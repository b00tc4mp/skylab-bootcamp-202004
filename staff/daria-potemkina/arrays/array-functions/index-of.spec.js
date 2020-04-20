describe('indexOf', function () {
    it('it should return the index of the number that you pass by parameter in this case, we look for the number 1 and we tell it to start from the index 2, it should find it in the index 3', function () {
        
        var array = [1, 2, 3, 1, 5, 6, 1, 8]
        var a = indexOf(array, 1, 2);
        expect(a).toBe(3);

    });

    it('it should return the index of the number that you pass by parameter in this case, we look for the string hola and we dont tell it where to start , it should find it in the index 0', function () {
        
        var array = ['hola', 'mundo', 1, 5, 6, 1, 8]
        var a = indexOf(array, 'hola');
        expect(a).toBe(0);

    });

    it('should iterate on each element and return index of element passed', function () {
        
        var array = [1, 2, 3, 1, 5, 6, 1, 8]
        var a = indexOf(array, 2);
        expect(a).toBe(1)
    });

    it('should iterate on each element and return -1', function () {
        
        var array = [1, 2, 3, 1, 5, 6, 1, 8]
        var a = indexOf(array, 22);
        expect(a).toBe(-1)
    });

})
