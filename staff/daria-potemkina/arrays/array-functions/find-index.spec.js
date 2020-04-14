describe('findIndex', function () {

    it('should iterate on each element and return a first element greater than 10', function () {

        var array = [111, 20, 3]
        var e = findIndex(array, function (element) {
            if (element > 10) {
                return true;
            }
        });
        expect(e).toEqual(0)
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {

        var array = [1, 2, 3]
        var e = findIndex(array, function (element) {
            if (element > 10) {
                return true;
            }
        });
        expect(e).toEqual(-1)
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = findIndex(array, function (element) {
            if (element === 'mundo') {
                return true;
            }
        });
        expect(e).toEqual(-1)
    });

    it('should iterate on each element and return a first element that length is iqual to 10', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = findIndex(array, function (element) {
            if (element.length === 8) {
                return true;
            }
        });
        expect(e).toEqual(3)
    });

});