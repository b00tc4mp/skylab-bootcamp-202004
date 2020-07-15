Array.prototype.orderBy = function(parameter){
    return this.sort(function(a, b){
            if(a[parameter] < b[parameter]) { return -1; }
            if(a[parameter] > b[parameter]) { return 1; }
                return 0;
            })
}
// function order(data, parameter){
//     return data.sort(function(a, b){
//             if(a[parameter] < b[parameter]) { return -1; }
//             if(a[parameter] > b[parameter]) { return 1; }
//                 return 0;
//             })
// }
module.exports = Array.prototype.orderBy