describe('Arroz.prototype.includes', function() {

    it('should return true  if it is available', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        var included = names.includes("juanito")
        expect(included).toBe(true)
    })

    it('should return false  if it is available', function(){
        var names = new Arroz('manuel', 'alex', 'kaula')
        var included = names.includes("juanito")
        expect(included).toBe(false)
    })

    it('should fail when callback is not a function (try catch)', function(){
        
        try{
            var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
            names.includes()
        }catch(error){
            expect(error.message).toBe('undefined is not a function')
        }

    })

}) 