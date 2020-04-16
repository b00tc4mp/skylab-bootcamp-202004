describe("The pop method ", function () {
    it("should return undefined when the array is empty", function () {
        var array = [];
        var deletedValue = pop(array);

        expect(deletedValue).toBe(undefined);
    });

    it("should return the deleted element from an array", function () {
        var array = ["hello", "cruel", "world"];
        var deletedValue = pop(array);

        expect(deletedValue).toBe("world");
    });

    it("should remove the last element from an array. This method changes the length of the array.", function () {
        var array = ["hello", "cruel", "world"];

        pop(array);

        expect(array[0]).toBe("hello");
        expect(array[1]).toBe("cruel");
        expect(array.length).toBe(2);
    });
});