"use strict";

describe("Arroz.prototype.splice", function () {
  it("should cut two items, add new item to that position and return the rest modifying the array", function () {
    var fruits = new Arroz(
      "Banana",
      "Orange",
      "Apple",
      "Mango",
      "Strawberry",
      "Berry",
      "Lemon"
    );

    fruits.splice(2, 2, "Avocado", "Peach");

    expect(fruits[3]).toBe("Avocado");
    expect(fruits[4]).toBe("Peach");
    expect(fruits.length).toBe(7);
  });

  it("should cut two items of the array and return the rest modifying the array", function () {
    var fruits = new Arroz(
      "Banana",
      "Orange",
      "Apple",
      "Mango",
      "Strawberry",
      "Berry",
      "Lemon"
    );

    fruits.splice(2, 2);

    expect(fruits[3]).toBe("Berry");
    expect(fruits.length).toBe(5);
  });

  it("should cut two items of the array and return the rest modifying the array test 2", function () {
    var fruits = new Arroz(
      "Banana",
      "Orange",
      "Apple",
      "Mango",
      "Strawberry",
      "Berry",
      "Lemon"
    );

    fruits.splice(2, 3);

    expect(fruits[3]).toBe("Lemon");
    expect(fruits.length).toBe(4);
  });
});
