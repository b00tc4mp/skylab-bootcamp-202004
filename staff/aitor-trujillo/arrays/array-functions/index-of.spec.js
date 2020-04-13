describe("myIndexOf", function () {
  it("should return the index 2 of the array", function () {
    var myArray = ["I", "am", "a", "test"];

    var result1 = myIndexOf(myArray, "a");
    var result2 = myIndexOf(myArray, "test");
    var result3 = myIndexOf(myArray, "not in array");

    expect(result1).toBe(2);
    expect(result2).toBe(3);
    expect(result3).toBe(-1);
  });
  it("should return the index 2 of the array", function () {
    var myArray = ["I", "am", "a", "test", "of", "indexOf", "am"];

    var result1 = myIndexOf(myArray, "a");
    var result2 = myIndexOf(myArray, "a", 3);

    expect(result1).toBe(2);
    expect(result2).toBe(-1);
  });
});
