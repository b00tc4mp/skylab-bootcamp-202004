describe('Arroz.prototype.filter', function() {

    it('should return element that passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        var filtrado = names.filter(function(name){
            return name.length === 4
        })
        expect(filtrado.length).toBe(1)
        expect(filtrado[0]).toBe('alex')
    })

}) 