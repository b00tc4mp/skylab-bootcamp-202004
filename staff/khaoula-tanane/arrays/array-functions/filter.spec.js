describe('filter', function() {

    it('should return element that passes condition', function(){
        var names = ['manuel', 'juanito', 'alex', 'kaula']
        var filtrado = filter(names, function(name){
            return name.length === 4
        })
        expect(filtrado.length).toBe(1)
        expect(filtrado[0]).toBe('alex')
    })



}) 