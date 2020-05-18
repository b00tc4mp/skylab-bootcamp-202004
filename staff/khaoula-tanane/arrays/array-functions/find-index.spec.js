describe('find-index-of', function() {

    it('should return position of element that passes condition', function(){
        var names = ['manuel', 'juanito', 'alex', 'kaula']
        var index = findIndexOf(names, function(name){
            return name.length === 4
        })
        expect(index).toBe(2)
    })

    it('should return undefined when it does not pass the condition', function(){
        var names = ['manuel', 'juanito', 'alex', 'kaula']
        var index = findIndexOf(names, function(name){
            return name.length === 8
        })
        expect(index).toBe(-1);
    })

}) 