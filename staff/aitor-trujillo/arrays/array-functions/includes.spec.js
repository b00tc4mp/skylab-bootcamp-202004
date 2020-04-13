describe("myIncludes", function () {
  it("should return true if finds the string in the array myArr", function () {
    myArr = ["I", "am", "pretty"];

    var result = myIncludes(myArr, "pretty");

    expect(result).toBe(true);
  });
  it("should return false if doesn't find the string in the array myArr", function () {
    myArr = ["I", "am", "pretty"];

    var result = myIncludes(myArr, "ugly");

    expect(result).toBe(false);
  });
  it("should return false if doesn't find the string in the array myArr starting on index = 2", function () {
    myArr = ["I", "am", "pretty"];

    var result = myIncludes(myArr, "I", 1);

    expect(result).toBe(false);
  });
});
