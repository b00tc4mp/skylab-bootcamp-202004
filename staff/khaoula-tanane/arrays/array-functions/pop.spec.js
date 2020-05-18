describe('pop', function() {

    it('should delelte the last element of an array', function(){
        var numbers = [1,3,4,6] 
        pop(numbers)
        expect(numbers.length).toBe(3)  
    })

    it('should return the deleted element from array', function(){
        var numbers = [1,3,4,6] 
        var lastOne = pop(numbers)
        expect(lastOne).toBe(6)  
    })

}) 