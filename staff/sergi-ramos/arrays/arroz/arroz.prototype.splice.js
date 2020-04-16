Arroz.prototype.splice = function (index, numDelete) {
    var deleteNums = []
    for (var i = index; i < this.length; i++) {
        if (numDelete > deleteNums.length) {
            deleteNums = this[i];
            delete this[i]
        }


    }


    return deleteNums


}





splice(1, 2)