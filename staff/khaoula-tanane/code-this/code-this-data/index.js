const { mongo } = require('mongoose');

 module.exports = {
    mongoose: require('./mongoose'),
    models: require('./models'),
    mongo: require('./mongo')
}