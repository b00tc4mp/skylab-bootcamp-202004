describe('push', function() {
    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = [1, 2, 3];
        var element = [4, 5, 6];
        var result;

        result = push(array, element);


        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(result).toBe(6);

    });

    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = ["dog", "cat", "bird"];
        var element = ['horse', 'shark'];

        result = push(array, element);


        expect(array[3]).toBe('horse');
        expect(array[4]).toBe('shark');
        expect(result).toBe(5);

    });
});