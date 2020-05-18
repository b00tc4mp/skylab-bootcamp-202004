describe('indexOf', function() {

    it('should return position if element is found', function(){
        var names = ['manel', 'juan', 'alex']
        var  position = indexOf(names, "juan")
        expect(position).toBe(1)
    })


    it('should return -1 it is not found', function(){
        var names = ['manel', 'juan', 'alex']
        var  position = indexOf(names, "lucrecia")
        expect(position).toBe(-1)
    })

    it('it should search for item from specified position', function(){
        var names = ['manel', 'juan', 'alex', 'jorge', 'manel', 'fatima']
        var  position = indexOf(names, "manel", 3)
        expect(position).toBe(4)
    })



}) 