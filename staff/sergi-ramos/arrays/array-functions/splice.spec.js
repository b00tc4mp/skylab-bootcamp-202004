describe('splice', function () {
    it('....', function () {
      
        var array = ['hola', 'mundo', 'como', 'estas'];
        var arrayResult = [];
        arrayResult = splice(array, 1, 2);

        expect(arrayResult).toEqual(['hola', 'estas']);
       
    });

    it('it should put in the array from index 2 included', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = splice(array, 3);

        expect(arr).toEqual([4, 5, 6, 7]);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });
  
})