describe("The method splice", function () {
    it(" insert elements without removing elements from array" , function () {
        
        var numbers = [ 1, 2, 4, 5, 6, 7];
        splice(numbers, 2, 0, 3);


        expect(numbers[2]).toBe(3);
        expect(numbers[3]).toBe(4);
        expect(numbers.length).toBe(7);

    });

    it("Insert elements y remove elements from the array" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];

        splice(numbers, 2, 2);


        expect(numbers[2]).toBe(6);
        expect(numbers[3]).toBe(7);
        expect(numbers.length).toBe(4);
    });

    it("if the start is negative, start = array.length-(start in absolute value)" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];
        
        splice(numbers, -1, 1);

        expect(numbers[4]).toBe(6);
        expect(numbers.length).toBe(5);
    });

    it("with negative starting point, the function can still add elements to the array" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];
        
        splice(numbers, -1, 1, 7);

        expect(numbers[5]).toBe(7);
        expect(numbers.length).toBe(6);
    });

    it("if no deleteCount is introduced, all elements after the start point are deleted" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];
        
        splice(numbers, 2);

        expect(numbers[1]).toBe(2);
        expect(numbers.length).toBe(2);
    });

    it("adds the element to the end if start is higher than the length of the array" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];
        
        splice(numbers, 7, 0, 8);

        expect(numbers[6]).toBe(8);
        expect(numbers.length).toBe(7);
    });

    it("add any amount of elements introduced in the function after array, start and end" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];  
        splice(numbers, 3, 0, 2, 5, 6, 7, 8);
        expect(numbers.length).toBe(11);
    });

    it("if deleteCount is negative, deleteCount becomes 0" , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];  
        splice(numbers, 3, -3);
        expect(numbers.length).toBe(6);
    });
});
