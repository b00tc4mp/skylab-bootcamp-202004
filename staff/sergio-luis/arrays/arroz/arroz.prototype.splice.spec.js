describe('Arroz.prototype.splice', function () {
    it('The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place! test with one element', function () {
        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2);

        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2,1);
        
        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2,2);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result1 = array.splice(2,2,9,7,8);
        // expect(result1[0]).toBe(3);
        // expect(result1[1]).toBe(4);
        // expect(result1[2]).toBe(5);
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);

       
        // expect(result1[0]).toBe(4);
        // expect(result1[1]).toBe(5);
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);
        // expect(array[2]).toBe(3);
    });
    it('The splice() method changes with two elements', function () {
        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2,0);
        // expect(result1.length).toBe(0);
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);
        // expect(array[2]).toBe(3);
        // expect(array[3]).toBe(4);
        // expect(array[4]).toBe(5);

        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2,1);
        // expect(result1[0]).toBe(3);
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);
        // expect(array[2]).toBe(4);
        // expect(array[3]).toBe(5);
    
        // var array = new Arroz(1, 2, 3, 4, 5);
        // var result1 = array.splice(2,3);
        // expect(result1[0]).toBe(3);
        // expect(result1[1]).toBe(4);
        // expect(result1[2]).toBe(5);
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);
  
    });
}); 