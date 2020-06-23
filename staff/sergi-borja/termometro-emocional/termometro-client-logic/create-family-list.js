require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: { call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token);

    return (async () => {
        const response = await call('GET', `${this.API_URL}/users`, undefined, { 'Authorization': `Bearer ${token}` });

        const user = JSON.parse(response.body);

        if (!user.admin) {
            let { members } = user;

            for (let i = 0; i < members.length; i++) {
                const _response = await call('GET', `${this.API_URL}/users/${members[i]}`);

                const memberInfo = JSON.parse(_response.body);

                members[i] = memberInfo;
            }

            return members;
        } else {
            let { admin } = user;

            const _response = await call('GET', `${this.API_URL}/users/${admin}`);

            const adminInfo = JSON.parse(_response.body);

            return adminInfo;
        }
    })();

}.bind(context)
