const context = require('./context')
module.exports = function(){
     
    this.storage.removeItem('token')
    return
}.bind(context)