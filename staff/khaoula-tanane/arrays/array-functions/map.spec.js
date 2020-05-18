describe('map', function() {

    it('should map array and multiply * 2', function(){
        var numbers = [1,2,3,4,5]

        var mapped = map(numbers, function(number){
            return number * 2
        })

        for(var i = 0; i < mapped.length; i++){
            expect(mapped[i]).toBe(numbers[i]*2)
        }

    })

}) 