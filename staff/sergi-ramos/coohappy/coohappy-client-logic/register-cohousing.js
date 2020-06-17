require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (name, { street, number, city, country }, laundryNum, token) => {

    number = parseInt(number)
    String.validate.notVoid(name)
    String.validate.notVoid(street)
    if (typeof number !== 'number') throw new TypeError(`${number} is not a number`)
    if (typeof laundryNum !== 'number') throw new TypeError(`${laundryNum} is not a number`)
    String.validate.notVoid(city)
    String.validate.notVoid(country)
    String.validate.notVoid(token)

    //TODO admin can change this value

    return (async () => {

        const response = await call(
            'POST',
            `${API_URL}cohousings`,
            JSON.stringify({ name, address: { street, number, city, country }, laundryNum }),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
        
        const {status} = response;
        if (status === 201) return;

        const { error } = response;

        throw new Error(error)
    })()
}