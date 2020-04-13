describe('findIndex', function () {
    it('The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.', function () {
        var array = [1,2,3,4,8,9,10];

        var result1 = findIndex(array,function(element){
            return element  > 4 
        })
        var result2 = findIndex(array,function(element){
            return element < 5
        })

        expect(result1).toBe(4)
        expect(result2).toBe(0)
       
    
    });
    it('The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.', function(){
        var array = ['hola','que','Sergio','Jordi'];

        var result1 = findIndex(array,function(element){
            return element.length < 5;
        })
        var result2 = findIndex(array,function(element){
            return element.length > 10;
        })
        expect(result1).toBe(0)
        expect(result2).toBe(-1)
     });
});