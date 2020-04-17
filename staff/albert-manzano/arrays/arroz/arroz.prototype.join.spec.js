'use strict'

describe('Arroz.prototypejoin', function() {
    it(' This method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.', function() {
        var array = new Arroz("conejo", "cabra", "unicornio", "leopardo")

        var result = array.join();

        expect(result).toBe("conejo,cabra,unicornio,leopardo");
    });
    it(' This method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.', function() {
        var array = new Arroz("conejo", "cabra", "unicornio", "leopardo")

        var result = array.join(1);

        expect(result).toBe("conejo1cabra1unicornio1leopardo");
    });

    it('shall return the index and the element', function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.find({
                name: 'Fulanito'
            });
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });

});

