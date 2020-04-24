describe('join', function() {
    it(' This method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.', function() {
        var array = ["conejo", "cabra", "unicornio", "leopardo"]

        var result = join(array);

        expect(result).toBe("conejocabraunicornioleopardo");
    });
});