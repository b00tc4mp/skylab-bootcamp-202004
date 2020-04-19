"use strict";

describe("every", function () {
  it("should return true if all elements are greater or equal than 18", function () {
    var peopleAge = [18, 21, 25, 28, 40, 58, 60];

    var iFoundSomething = every(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(true);
  });
  it("should return false if all elements aren't greater or equal than 18", function () {
    var peopleAge = [8, 21, 25, 28, 40, 58, 60];

    var iFoundSomething = every(peopleAge, function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(false);
  });
});
