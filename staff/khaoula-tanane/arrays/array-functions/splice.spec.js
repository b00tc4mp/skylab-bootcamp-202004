describe('splice', function() {

    it('should remove elements from array', function(){
        var letters = ["a", "b", "c", "d", "k", "m"];
        var deleted = splice(letters, 1,5 )

        expect(deleted.length).toBe(4)
        expect(letters.length).toBe(2)
        expect(letters.join('')).toBe('am')
    })

    it('should remove and replace', function(){
        var letters = ["a", "b", "c", "d", "k", "m"];
        var deleted = splice(letters, 1, 5, '*', '__', '*')

        expect(deleted.length).toBe(4)
        expect(letters.length).toBe(5)
        expect(letters.join('')).toBe('a*__*m')

    })

}) 
