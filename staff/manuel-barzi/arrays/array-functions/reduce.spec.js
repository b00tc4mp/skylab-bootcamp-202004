'use strict';

describe('reduce', function () {
    it('should accumulate the total price of cart', function () {
        var tshirt = { color: 'blue', price: 10 };
        var shorts = { color: 'grey', price: 15 };
        var hoodie = { color: 'white', price: 20 };

        var cart = [tshirt, shorts, hoodie];

        var total = reduce(cart, function (subtotal, item) { return subtotal + item.price; }, 0);

        expect(total).toBe(45);
        expect(cart[0]).toBe(tshirt);
        expect(cart[1]).toBe(shorts);
        expect(cart[2]).toBe(hoodie);
    });

    it('should accumulate the total sum of numbers', function () {
        var numbers = [1, 2, 3];

        var total = reduce(numbers, function (subtotal, item) { return subtotal + item; });

        expect(total).toBe(6);
        expect(numbers[0]).toBe(1);
        expect(numbers[1]).toBe(2);
        expect(numbers[2]).toBe(3);
    });
});