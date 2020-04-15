describe('arroz.prototype.pop', function () {
    it('', function () {


        var array = new Arroz(1, 2, 3, 4, 5);
        var array2 = array.pop();
       

        expect(array2).toEqual([1,2,3,4])


    })
})