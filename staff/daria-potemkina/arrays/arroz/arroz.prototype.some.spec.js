describe('Arroz.prototype.some', function () {

    it('should iterate on each element and return true because condition is true', function () {
        var array = new Arroz(11, 20, 3);
        var result = array.some(function (element) {
            return element / 2 === 10;
        });

        expect(result).toEqual(true);

        array = new Arroz('hola', 'pepito', 'daria', 'elemento');
        result = array.some(function (element) {
           return element.length === 4;
        });

        expect(result).toEqual(true);
    });

    it('should iterate on each element and return false because the condition is false', function () {
        var array = new Arroz(1, 2, 3);
        var result = array.some(function (element) {
            return element > 10;
        });
        expect(result).toEqual(false);

        array = new Arroz('hola', 'pepito', 'daria', 'elemento');
        result = array.some(function (element) {
            return element === 'mundo';
        });

        expect(result).toEqual(false);
    });

    it('it should return a type error',function (){
        var array = new Arroz(1, 2, 3);

        expect(function(){
            array.some('hola');
        }).toThrowError(TypeError, 'hola is not a function');
    });

});