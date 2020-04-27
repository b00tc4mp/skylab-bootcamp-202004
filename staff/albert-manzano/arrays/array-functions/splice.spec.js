describe('splice', function() {
    it(' modifies de original array and adds at the index position', function() {

        var array = ["Jan", "Feb", "March", "April", "June"]
        var elements = ["sep"]

        array = splice(array, 3, 0, elements)

        expect(array[4]).toBe("April")
    });

    it(' modifies de original array and adds at the index position and remove 1 element.', function() {

        var array = ["Jan", "Feb", "March", "April", "June"]
        var elements = ["sep"]

        array = splice(array, 3, 1, elements)

        expect(array[4]).toBe("June")
    });
});