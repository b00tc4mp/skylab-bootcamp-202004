 /* Arroz.prototype.slice=function(initValue,finalValue) {
    var arr=[];
    if(initValue>this.length || typeof finalValue==="string")return arr;
    if(initValue === "undefined" || typeof initValue === "string") initValue=0;
    if(initValue<0)initValue+=this.length;
    if(finalValue<0)finalValue+=this.length;
    if(finalValue > this.length || finalValue === "undefined")finalValue=this.length;
    
    for(var i=initValue;i<finalValue;i++){
        arr[arr.length]=this[i];
    }
    return arr;
    
}  */

 Object.defineProperty(Arroz.prototype, "slice", {
    value: function (begin, end) {
     var slicedValues = [];
      if (begin > this.length || typeof end === "string") {
        return slicedValues;
      }
      if (typeof begin === "undefined" || typeof begin === "string") {
        begin = 0;
      }
      if (begin < 0) {
        begin = this.length + begin;
      }
      if (end < 0) {
        end = this.length + end;
      }
      if (typeof end === "undefined" || end > this.length) {
        end = this.length;
      }
 
      for (var i = begin; i < end; i++) {
        slicedValues[slicedValues.length] = this[i];
      }
      return slicedValues;
    },
    enumerable: true,
    writable: true,
  });