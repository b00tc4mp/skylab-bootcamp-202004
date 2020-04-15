describe('every', function () {

    it('should iterate on each element and return true because all elements meet the condition', function () {

        var array = [111, 20, 3]
        var e = every(array, function (element) {
            return element > 2;
        });
        expect(e).toEqual(true)
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition', function () {

        var array = [1, 20, 3]
        var e = every(array, function (element) {
            return element > 10;
        });
        expect(e).toEqual(false)
    });

    it('should iterate on each element and return true because all elements meet the condition', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = every(array, function (element) {
            return (element.length >= 4);
        });
        expect(e).toEqual(true)
    });

    it('should iterate on each element and return false because there are some elments that do not meet the condition, check the index of element', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        arr = []
        var e = every(array, function (element) {
            return element.length === 5;
         
        });
        expect(e).toEqual(false)
        
    });

});