
describe('splice', function () {
    it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var begin=3;
        var insert=10;
        var length=0;
        splice(array, begin,length,insert);

        expect(array[3]).toBe(10);
    });
    it('should add and replace', function () {
        var array = ['Jan', 'March', 'April', 'June'];
        var begin=1;
        var insert="Feb";
        var length=0;
        splice(array, begin,length,insert);

        expect(array[1]).toBe("Feb");
        splice(array,4,1,"May");
        expect(array[4]).toBe("May");
    });
    it('should work when adding multiple elements', function () {
        var array = ['Jan', 'March', 'April', 'June'];
        var begin=1;
        var insert=["Feb","March"];
        var length=0;
        splice(array, begin,length,insert);

        expect(array[0]).toBe("Jan");
        expect(array[1]).toBe("Feb");
    });
});