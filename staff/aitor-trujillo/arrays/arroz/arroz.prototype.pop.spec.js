describe("pop", function () {
  it("should delete the last number of array", function () {
    var arroz = new Arroz(1, 2, 3);

    arroz.pop();

    expect(arroz[1]).toBe(2);
    expect(arroz[2]).toBe(undefined);
  });
});
