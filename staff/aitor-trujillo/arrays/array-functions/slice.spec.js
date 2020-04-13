describe("mySlice", function () {
  it("should cut at start index up to end index of array", function () {
    var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

    var citrus = mySlice(fruits, 1, 3);

    expect(citrus[0]).toBe("Orange");
    expect(citrus[3]).toBe(undefined);
  });
});
