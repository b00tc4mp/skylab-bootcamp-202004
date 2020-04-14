describe('join', function () {
    it('Should take the content of the array, connect the items and turn them to string format word ', function () {
        var array = ['Fire', 'Air', 'Water'];

        result=join(array);

        expect(result).toBe("FireAirWater");
    });

    it('Should take the content of the array, connect the items and turn them to string format word ', function () {
        var array = [1, 2, 3];

        result=join(array);

        expect(result).toBe("123");
    });
});