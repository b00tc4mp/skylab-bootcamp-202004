describe('find', function () {

    it('should iterate on each element and return a first element greater than 10', function () {
        var array = [111, 20, 3];

        var result = find(array, function (element) {
            return element > 10;
        });

        expect(result).toEqual(111);
    });

    it('should iterate on each element and return undefined ', function () {
        var array = [1, 2, 3];

        var result = find(array, function (element) {
            return element > 10;
        });

        expect(result).toEqual(undefined);
    });

    it('should iterate on each element and return undefined ', function () {
        var array = ['hola', 'pepito', 'daria', 'elemento'];

        var result = find(array, function (element) {
            return element === 'mundo';

        });

        expect(result).toEqual(undefined);
    });

    it('should iterate on each element and return hola ', function () {
        var array = ['hola', 'pepito', 'daria', 'elemento'];

        var result = find(array, function (element) {
            return element.length === 4;
        });

        expect(result).toEqual('hola');
    });

});