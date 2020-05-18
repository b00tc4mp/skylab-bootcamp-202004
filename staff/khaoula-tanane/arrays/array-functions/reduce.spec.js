describe('reduce', function() {

    it('should calculate total of number', function(){
        var numbers = [1,3,4,5]
        var total = reduce(numbers, function(acumulator, number, i, array){
            return acumulator + number
        }, 0)
        expect(total).toBe(13)
    })

    it('should concat arrays to simple array', function(){
        var numbers = [[1,2], [3], [4, 5]]
        var simpleArray = reduce(numbers, function(acumulator, current, i, array){
            return acumulator.concat(current)
        }, [])
        expect(simpleArray.length).toBe(5)
    })


}) 