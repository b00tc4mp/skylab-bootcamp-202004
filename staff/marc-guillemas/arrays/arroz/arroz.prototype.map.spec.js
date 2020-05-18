describe("Arroz.prototype.map.js", function () {
    it("should return the operated value in a new array", function () {

        var array = new Arroz(3, 4, 3, 6, 1)

        array.map(function (currentValue, index, array) {

            return currentValue * 10
        });

    })



    it("should return the UPPERCASE value in a new array", function () {

        var array = new Arroz('hola', 'mundo', 'pepito', 'menganito')

        array.map(function (currentValue, index, array) {
            
            return currentValue.toUpperCase();
        });

        expect(array[1]).toBe('MUNDO');

    })
})