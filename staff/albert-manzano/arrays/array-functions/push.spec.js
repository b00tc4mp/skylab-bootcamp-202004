describe('push', function() {
    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = [1, 2, 3];
        var element = [4, 5];

        push(array, element);


        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

    });

    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = ["dog", "cat", "bird"];
        var element = ['horse', 'shark'];

        push(array, element);


        expect(array[3]).toBe('horse');
        expect(array[4]).toBe('shark');

    });
});