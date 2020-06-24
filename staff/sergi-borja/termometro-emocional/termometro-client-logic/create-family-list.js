require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: { call } } = require('termometro-commons')
const context = require('./context')

/**
 * Checks user credentials.
 * 
 * @param {string} token The token
 * 
 * @returns {Object} if a member is requesting this petition, returns the info of its administrator
 * or
 * @returns {Object} if an admin is requesting this petition, returns an array with its members
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

module.exports = function (token) {

    String.validate.notVoid(token);

    return (async () => {
        const response = await call('GET', `${this.API_URL}/users`, undefined, { 'Authorization': `Bearer ${token}` });
        const { status } = response
        const user = JSON.parse(response.body);
        if (status == 200) {
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
        } else {
            const { error } = JSON.parse(response.body)

            throw new Error(error)
        }
    })();

}.bind(context)
