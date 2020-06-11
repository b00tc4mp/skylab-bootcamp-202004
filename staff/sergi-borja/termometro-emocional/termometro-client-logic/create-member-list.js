require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: { call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token);

    return (async () => {
        const response = await call('GET', `${this.API_URL}/users`, undefined, { 'Authorization': `Bearer ${token}` });
        
        let { members } = JSON.parse(response.body);
        
        for (let i = 0; i < members.length; i++) {
            const _response = await call('GET', `${this.API_URL}/users/${members[i]}`);
    
            const memberInfo = JSON.parse(_response.body);
    
            members[i] = memberInfo;
        }

        return members;
    })();

}.bind(context)


// await call('GET', `${this.API_URL}/users`,
//     undefined,
//     { 'Authorization': `Bearer ${token}` })
//     .then(bodyAndState => {
//         const body = JSON.parse(bodyAndState.body)

//         let membersListOfIds = body.members
//         let membersList = []

//         membersListOfIds.map((member) => {
//             return call('GET', `${this.API_URL}/users/${member}`,
//                 undefined,
//                 undefined)
//                 .then((bodyAndStateOfMember) => {
//                     const memberFound = JSON.parse(bodyAndStateOfMember.body)

//                     membersList.push(memberFound.name)
//                 })
//         })

//         return membersList
//     })
