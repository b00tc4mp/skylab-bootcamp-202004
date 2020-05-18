describe('every', function() {

    it('should return true if every element passes the condition', function(){
        var animals = ['toro', 'vaca', 'perro', 'gato']

        var everyAnimal = every(animals, function(animal){
            return animal.length >= 3
        })
        expect(everyAnimal).toBe(true)
    })



}) 