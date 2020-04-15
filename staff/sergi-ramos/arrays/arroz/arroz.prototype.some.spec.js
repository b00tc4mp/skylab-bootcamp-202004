describe('arroz.prototype.some', function () {
    it('should return true or false if it finds a single element that meets the callback condition', function () {


        var array = new Arroz(1, 2, 3, 4, 5)
        var boolean = array.some(function (element) {


            return element === 5
        })

        expect(boolean).toBe(true)


    })


    it('should return true or false if it finds a single element that meets the callback condition', function () {


        var array = new Arroz(1, 2, 3, 4, 5)
        var boolean = array.some(function (element) {


            return element > 5
        })

        expect(boolean).toBe(false)


    })
})
