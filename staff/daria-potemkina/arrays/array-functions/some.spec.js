describe('some', function () {

    it('should iterate on each element and return true because condition is true', function () {

        var array = [111, 20, 3]
        var e = some(array, function (element) {
            if (element / 2 === 10) {
                return true;
            }
        });
        expect(e).toEqual(true)
    });

    it('should iterate on each element and return false because the condition is false', function () {

        var array = [1, 2, 3]
        var e = some(array, function (element) {
            if (element > 10) {
                return true;
            }
        });
        expect(e).toEqual(false)
    });

    it('should iterate on each element and return true because condition is true', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = some(array, function (element) {
            if (element === 'mundo') {
                return true;
            }
        });
        expect(e).toEqual(false)
    });

    it('should iterate on each element and return false because the condition is false', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = some(array, function (element) {
            if (element.length === 4) {
                return true;
            }
        });
        expect(e).toEqual(true)
    });

});