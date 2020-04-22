describe("the push method", function () {
    it("should add the string (pig) at the end of the array called upn", function () {
        var array = ["horse", "cat", "dog"];

        push(array, "pig");

        expect(array[3]).toBe("pig");
    });

    it("return the length of the array it was called upon", function () {
        var array = ["horse", "cat", "dog"];

        push(array, "pig");

        expect(array.length).toBe(4);
    });

    it("add more than one item to the end of the array if needed", function () {
        var array = ["horse", "cat", "dog"];

        push(array, "pig", "fish", "pig");

        expect(array.length).toBe(6);
        expect(array[4]).toBe("fish");
        expect(array[5]).toBe("pig");
    });

    it("should iterate on each element provide the full array from the third argument of the expression (callback)", function () {
        var array = [1, 2, 3];
        var result = [];

        forEach(array, function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
});