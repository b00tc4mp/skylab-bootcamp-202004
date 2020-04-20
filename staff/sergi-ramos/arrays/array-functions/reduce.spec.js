describe('reduce', function () {
    it('should return the sum of the array values ​​from an Initial value of 5', function () {

        var array = [1, 2, 3];
        var valorInicial = 5;
        var suma2 = reduce(array, function (acumulador, currentValue, index, array) {

            return acumulador + currentValue

        }, valorInicial)

        expect(suma2).toBe(11);
    });
    it('it should return the sum of the two strings that are in the array without any initial value', function () {

        var array = ['hola', 'mundo'];
        var suma2 = reduce(array, function (acumulador, currentValue, index, array) {

            return acumulador + ' ' + currentValue

        })
        expect(suma2).toBe('hola mundo');
    });

    it('it should return the sum of the two strings that are in the array with an initial value and check the original array', function () {

        var array = ['hola', 'mundo!'];
        var string = 'soy sergi y os quiero decir'
        var suma2 = reduce(array, function (acumulador, currentValue, index, array) {

            return acumulador + ' ' + currentValue

        }, string)
        expect(suma2).toBe('soy sergi y os quiero decir hola mundo!');
        expect(array).toEqual(['hola', 'mundo!'])
    });
})