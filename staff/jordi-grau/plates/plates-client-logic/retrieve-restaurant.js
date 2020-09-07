require('plates-commons/polyfills/string')
const { utils: { Email, call }} = require('plates-commons')
const context = require('./context');


module.exports = function(restaurantId) {
    String.validate.notVoid(restaurantId);

    const { token } = this.storage

    return (async() => {
        const response = await call(
            'GET',
            `${this.API_URL}/restaurant/${restaurantId}`);

        const { status, body } = response;
        
        if (status === 200) {
            const restaurant = JSON.parse(body)
            return restaurant;
        }
        else{
                throw new Error(status, body)
        }
    })();
}.bind(context)