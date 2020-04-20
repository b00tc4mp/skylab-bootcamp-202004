describe('find', function () {
    it('The find() method returns the value of the first element in the provided array that satisfies the provided testing function', function () {
        var array = [1,2,3,4,8,9,10];

        var result1 = find(array,function(element){
            return element  > 4 
        })
        var result2 = find(array,function(element){
            return element < 5
        })

        expect(result1).toBe(8)
        expect(result2).toBe(1)
       
    
    });
    it('The find() method returns the value of the first element in the provided array that satisfies the provided testing function', function(){
        var array = ['hola','que','Sergio','Jordi'];

        var result1 = find(array,function(element){
            return element.length < 5;
        })
        var result2 = find(array,function(element){
            return element.length > 10;
        })
        expect(result1).toBe('hola')
        expect(result2).toBe(undefined)
     });
});