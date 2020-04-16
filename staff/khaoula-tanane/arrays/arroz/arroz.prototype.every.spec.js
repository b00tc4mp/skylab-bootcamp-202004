'use strict';

describe('Arroz.prototype.every', function() {

    it('should return true if every element passes the condition', function(){
        var animals = new Arroz('toro', 'vaca', 'perro', 'gato');

        var everyAnimal = animals.every(function(animal){
            return animal.length >= 3;
        })
        expect(everyAnimal).toBe(true);
    })

}) 