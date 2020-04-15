describe('Arroz.prototype.reduce', function() {

    it('should calculate total of number', function(){
        var numbers = new Arroz(1,3,4,5)
        var total = numbers.reduce(function(acumulator, number){
            return acumulator + number
        }, 0)
        expect(total).toBe(13)
    })

    it('should concat arrays to simple array', function(){
        var numbers = new Arroz([1,2], [3], [4, 5])
        var simpleArray = numbers.reduce(function(acumulator, current){
            return acumulator.concat(current)
        }, [])
        expect(simpleArray.length).toBe(5)
    })


}) 