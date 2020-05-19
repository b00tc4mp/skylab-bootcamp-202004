describe('push', function() {

    it('should add an element to the end of an array', function(){
        var numbers = [1,2,3,4,5]
        push(numbers, 9)

        expect(numbers.length).toBe(6)
        expect(numbers[5]).toBe(9)
    })

    it('should add multiple arguments to the end of an array', function(){
        var numbers = []
        push(numbers, 1, 2, 3)

        expect(numbers.length).toBe(3)
    } )




}) 