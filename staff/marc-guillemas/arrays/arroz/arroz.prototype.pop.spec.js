describe("Arroz.prototype.pop",function(){
    it("should eliminate las position of the arroz", function(){
        var arr = new Arroz(1,5,3,1,3,4);
        var result = arr.pop();

        expect(result).toBe(4);
    })
})