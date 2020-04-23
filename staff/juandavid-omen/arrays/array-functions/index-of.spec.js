describe("The index-of method", function () {
    it("returns the first position where the element is found within the array called upon", function () {
        var array = [2, 9, 9];

        result = indexOf(array, 9);

        expect(result).toBe(1);
    });

    it("if an index is provided, the count starts at the index", function () {
        var array = [2, 9, 9];

        result = indexOf(array, 9, 2);

        expect(result).toBe(2);
    });

    it("if index is equal or higher than the length of the array, returns -1", function () {
        var array = [2, 9, 9];

        result = indexOf(array, 9, 3);

        expect(result).toBe(-1);
    });

    it("if element is not found in the array, returns -1", function () {
        var array = [2, 9, 9];

        result = indexOf(array, 5);

        expect(result).toBe(-1);
    });
});