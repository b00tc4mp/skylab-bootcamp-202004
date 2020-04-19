'use strict'

describe ('Arroz.prototype.join', function () {
    it('it must join the array with the indicated separator ', function (){
        var array = new Arroz ('hola', 'que', 'ase' )
        
        var result = array.join('-')

        expect(result).toBe('hola-que-ase')
        
    })



    it('if the separator its undefined it must return an empty array' , function(){
        var array = new Arroz ('hola', 'que', 'ase')
        var result = array.join(undefined)
        expect(result.length).toBe(0)
        expect(result).toEqual([])
    })

    it('if dont put a separator it mus return an empty array', function(){
        var array = new Arroz('hola', 'que', 'ase')
        var result = array.join('')
        expect(result).toBe('holaquease')
    });
});
