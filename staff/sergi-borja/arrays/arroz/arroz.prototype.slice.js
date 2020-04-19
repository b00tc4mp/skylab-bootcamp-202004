Arroz.prototype.slice = function (begin = 0, end) {
    var newArray = [];
    for (var i = 0; i < this.length; i++) {
    if(begin===0 || begin=='string') newArray[i]=this[i];

    else if (begin < 0 && newArray.length < -begin) {
      newArray[i] = this[this.length + begin + i];

    } else if(begin>this.length) return newArray;

    else if(begin>0) newArray[i]= this[(begin-1)+i];

    if(end<0 || begin===end || begin>this.length) return newArray=[];

    else if(end>0 && i>=end-2) return newArray;
  } return newArray;
};
