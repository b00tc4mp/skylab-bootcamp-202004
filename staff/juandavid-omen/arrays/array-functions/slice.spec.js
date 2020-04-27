describe("The slice method ", function () {
  it("should return and empty array when the begin param is higher than the index range", function () {
    var array = [5, 12, 8, 130, 44];
    var result = slice(array, 6, 10);

    expect(result.length).toBe(0);
  });

  it("extract the subsequence of an array from index 0 to the parameter end", function () {
    var array = [5, 12, 8, 130, 44];
    var result = slice(array, 2);

    expect(result[0]).toBe(5);
    expect(result[1]).toBe(12);
    expect(result.length).toBe(2);
  });

  it("extract the subsequence of an array from the parameter begin to the parameter end", function () {
    var array = [5, 12, 8, 130, 44];
    var result = slice(array, 1, 3);

    expect(result[0]).toBe(12);
    expect(result[1]).toBe(8);
    expect(result.length).toBe(2);
  });
});




