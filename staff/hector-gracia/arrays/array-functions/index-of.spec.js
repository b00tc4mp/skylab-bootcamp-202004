describe('index-of', function () {
    it('should return the index of the first time an element appears in an array', function () {
        var array = [1, 2, 3, 4];
        var element = 3;
        var index  = 2;

        var result= indexOf(array, element, index);

        expect(result).toBe(0);

    });

});