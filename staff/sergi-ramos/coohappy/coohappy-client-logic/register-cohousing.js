require('coohappy-commons/polyfills/string')
const { utils: { call } } = require('coohappy-commons')
const context = require('./context')

module.exports = function(name, { street, number, city, country }, laundryNum) {

    number = parseInt(number)
    String.validate.notVoid(name)
    String.validate.notVoid(street)
    if (typeof number !== 'number') throw new TypeError(`${number} is not a number`)
    if (typeof laundryNum !== 'number') throw new TypeError(`${laundryNum} is not a number`)
    String.validate.notVoid(city)
    String.validate.notVoid(country)


    //TODO admin can change this value

    return (async () => {

        const token = await this.storage.getItem('TOKEN')

        const response = await call(
            'POST',
            `${this.API_URL}/cohousings`,
            JSON.stringify({ name, address: { street, number, city, country }, laundryNum }),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
        
        const {status} = response;
        if (status === 201) return;

        const { error } = JSON.parse(response.body);

        throw new Error(error)
    })()
}.bind(context)