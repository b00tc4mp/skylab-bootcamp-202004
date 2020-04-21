describe('find', function () {
    it('should return the value of the first element in the provided array that satisfies the provided testing function', function () {
        var array = [1, 2, 3, 4, 5];
        function expresion(element){
            return element>3;
        }
        var found=find(array, expresion);

        expect(found).toBe(4);
    });
    it('should return undefind if there is not any match', function () {
        var array = [1, 2, 3, 4, 5];
        function expresion(element){
            return element>10;
        }
        var found=find(array, expresion);

        expect(found).toBe(undefined);
    });
});