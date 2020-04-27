describe("filter", function () {
it("Should itereate on the array and return the value of the match", function () {

  var filtered = [12, 5, 8, 130, 44]
  filter(filtered,function (value) {
    return value >= 10;
  });

    expect(filtered[0]).toBe(12);
    
});
});
