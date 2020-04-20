"use strict";

describe("push", function () {
  it("should iterate numbers in arguments and add them to the end of array", function () {
    var arr = [1, 2, 3, 4, 5];

    push(arr, 1, 2, 3, 4);

    expect(arr[5]).toBe(1);
    expect(arr[6]).toBe(2);
    expect(arr[7]).toBe(3);
  });
  it("should iterate strings in arguments and add them to the end of array", function () {
    var arr = [1, 2, 3, 4, 5];

    push(arr, "hello", "world", "dude");

    expect(arr[5]).toBe("hello");
    expect(arr[6]).toBe("world");
    expect(arr[7]).toBe("dude");
  });
});
