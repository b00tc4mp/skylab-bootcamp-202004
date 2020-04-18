describe('find', function () {
    it('The find() method returns the value of the first element in the provided array that satisfies the provided testing function', function () {
  
        var array = [2, 4, 8, 12, 15, 18, 20];
  
        var result = find(array, function (searchValue) {
            return searchValue > 10
        })
  
        expect(result).toBe(12);
  
    });
    it('The find() method returns undefined is array is empty', function () {
        var arrayEmpty = [];
  
        var result = find(arrayEmpty, function (searchValue) {
            return searchValue > 10
        })
  
        expect(result).toBe(undefined);
  
    });
  
    it('The find() method returns index of the find is array is empty', function () {  
  
        var array = [1,2,3,4,5];
  
        var result = find(array, function (element, index, array) {
                if (element > 2)
            return index
            
        })
  
        expect(result).toBe(undefined);
  
    });
  
  })