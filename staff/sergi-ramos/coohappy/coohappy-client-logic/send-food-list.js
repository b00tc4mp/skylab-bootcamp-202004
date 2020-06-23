require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')

module.exports = function (message, email) {

    const { foodList } = message
    let html = '<h1>Food list</h1>'
    foodList.forEach(item =>
        html += `<br><p>${item.weight}Kg ${item.name}</p>`
    )

    String.validate.notVoid(email)
    Email.validate(email)

    return (async () => {

        const token = await this.storage.getItem('TOKEN')
        const res = await call('POST',
            `${this.API_URL}/cohousings/food/send`,
            JSON.stringify({ html, email }),
            { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })

        if (res.status === 201) return

        const { error } = JSON.parse(res.body)

        throw new Error(error)
    })()
}.bind(context)