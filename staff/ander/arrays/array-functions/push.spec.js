describe('push', function(){
  it('should add the indicated number to the end of the array', function(){
      var array = [2,4,6];
      var num = 8;
      
      push(array, num);
      expect(array[3]).toBe(8);
  });

  it('should add multiple values to the end of the array', function(){
      var array = [2,4,6];
      
      push(array, 8, 10);
      
      expect(array[3]).toBe(8);
      expect(array[4]).toBe(10);
  });

  it('should return the new length of the array', function(){
      var array = [2,4,6];
      var num = 8;
      var result = push(array, num);

      expect(result).toBe(4);
  });
  
});
