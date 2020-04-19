"use strict";

describe("findIndex", function () {
  it("should find the first element in the array greater or equal to 18 and returns it's index", function () {
    var peopleAge = [3, 4, 7, 10, 20, 18, 40];

    var iFoundSomething = findIndex(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(4);
  });
});
