"use strict";

describe("some", function () {
  it("should return true if it finds greater or equal than 18", function () {
    var peopleAge = [3, 4, 7, 10, 20, 18, 40];

    var iFoundSomething = some(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(true);
  });
  it("should return false if it doesn't find greater or equal than 18", function () {
    var peopleAge = [3, 4, 7, 10, 12, 17, 17.5];

    var iFoundSomething = some(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(false);
  });
});
