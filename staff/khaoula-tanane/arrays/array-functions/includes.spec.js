describe('includes', function() {

    it('should return true  if it is available', function(){
        var names = ['manuel', 'juanito', 'alex', 'kaula']
        var included = includes(names, "juanito")
        expect(included).toBe(true)
    })

    it('should return false  if it is available', function(){
        var names = ['manuel', 'alex', 'kaula']
        var included = includes(names, "juanito")
        expect(included).toBe(false)
    })

}) 