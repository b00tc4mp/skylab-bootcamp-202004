describe('filter', function () {

    it('should iterate on each element and return a new array with values greater than 10', function () {

        var array = [111, 20, 3]
        var arr = filter(array, function (element) {
            return element > 10;
            })

        expect(arr).toEqual([111, 20])
    });

    it('should iterate on each element and return empty array', function () {

        var array = [111, 20, 3]
        var arr = filter(array, function (element) {
            return element > 200;
        });

        expect(arr).toEqual([])
    });

    it('should iterate on each element and return a new array with values greater than 5 characters', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var arr = filter(array, function (element) {
            return element.length > 5
        });

        expect(arr).toEqual(['pepito', 'elemento'])
    });

});