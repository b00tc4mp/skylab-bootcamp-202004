describe('Arroz.prototype.slice', function() {

    it('should return an new array with sliced elments', function(){
        var fruits = new Arroz('apple', 'orange', 'pineapple', 'coconut', 'banana')
        var selectedFruits = fruits.slice(1, 3)
        expect(selectedFruits.length).toBe(2)
        expect(selectedFruits[0]).toBe('orange')
        expect(selectedFruits[1]).toBe('pineapple')

    })

}) 
