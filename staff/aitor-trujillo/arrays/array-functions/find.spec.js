"use strict";

describe("find", function () {
  it("should find the first element in the array greater or equal to 18", function () {
    var peopleAge = [3, 4, 7, 10, 20, 18, 40];

    var iFoundSomething = find(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(20);
  });
});
