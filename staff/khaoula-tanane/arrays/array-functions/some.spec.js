describe('some', function() {

    it('should retutn true some elements pass the condition', function(){
        var ages = [{age: 12}, {age: 13}, {age: 15}, {age: 18}]
        var someAdult = some(ages, function({age}){
            return age >= 18
        })
        expect(someAdult).toBe(true)
    })

    it('should return false when udefined', function(){
        var ages = [{age: 12}, {age: 13}, {age: 15}]
        var someAdult = some(ages, function({age}){
            return age >= 18
        })
        expect(someAdult).toBe(false);
    })

}) 