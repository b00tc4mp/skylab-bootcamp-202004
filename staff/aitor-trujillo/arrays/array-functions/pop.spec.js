"use strict";

describe("pop", function () {
  it("should delete the last number of array", function () {
    var arr = [1, 2, 3];

    pop(arr);

    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(undefined);
  });
});
