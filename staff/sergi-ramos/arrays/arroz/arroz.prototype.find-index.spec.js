describe('arroz.prototype.finde-index', function () {

    it('should return the position of the array of the first element that meets the conditions specified in the callback function', function () {
        var array = new Arroz(1, 2, 3, 4, 5)

        var a = array.findIndex(function (element, index, array) {
            return element < 10

            
        })
        expect(a).toBe(0)
    })


    it('should return the position of the array of the first element that meets the conditions specified in the callback function', function () {
        var array = new Arroz(1, 2, 3, 4, 5)

        var a = array.findIndex(function (element, index, array) {
            return element > 10
        })
        expect(a).toBe(-1)
    })
})