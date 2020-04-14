describe('every', function () {

    it('should iterate on each element and return true because all elements meet the condition', function () {

        var array = [111, 20, 3]
        var e = every(array, function (element) {
            if (element > 2) {
                return true;
            }
        });
        expect(e).toEqual(true)
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition', function () {

        var array = [1, 20, 3]
        var e = every(array, function (element) {
            if (element > 10) {
                return true;
            }
        });
        expect(e).toEqual(false)
    });

    it('should iterate on each element and return true because all elements meet the condition', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = every(array, function (element) {
            if (element.length >= 4) {
                return true;
            }
        });
        expect(e).toEqual(true)
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = every(array, function (element) {
            if (element.length === 5) {
                return true;
            }
        });
        expect(e).toEqual(false)
    });

});