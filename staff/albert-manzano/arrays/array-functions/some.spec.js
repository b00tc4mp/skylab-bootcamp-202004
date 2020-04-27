describe('some', function() {
    it(' tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function() {

        
        var array = [1, 2, 3, 4, 5];


        var result =some(array, function(element) {
            return element > 3;
        });

        expect(result).toBe(true);

    });
});

