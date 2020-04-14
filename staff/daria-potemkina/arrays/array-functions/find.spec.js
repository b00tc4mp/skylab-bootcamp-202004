describe('find', function () {

    it('should iterate on each element and return a first element greater than 10', function () {

        var array = [111, 20, 3]
        var e = find(array, function (element) {
            if (element > 10) {
                return element;
            }
        });
        expect(e).toEqual(111)
    });

    it('should iterate on each element and return undefined ', function () {

        var array = [1, 2, 3]
        var e = find(array, function (element) {
            if (element > 10) {
                return element;
            }
        });
        expect(e).toEqual(undefined)
    });

    it('should iterate on each element and return undefined ', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = find(array, function (element) {
            if (element === 'mundo') {
                return element;
            }
        });
        expect(e).toEqual(undefined)
    });

    it('should iterate on each element and return hola ', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = find(array, function (element) {
            if (element.length === 4) {
                return element;
            }
        });
        expect(e).toEqual('hola')
    });

});