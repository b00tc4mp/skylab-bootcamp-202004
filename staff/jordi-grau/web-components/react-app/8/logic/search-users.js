/* function searchUsers(query) {
    query = query.toLowerCase()

    const _users = users.filter(function (user) {
        const { name, surname, email } = user

        return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    })

    // const __users = _users.map(function(user) {
    const __users = _users.map(function ({ name, surname, email }) {
        // const { name, surname, email } = user

        return { name, surname, email }
    })

    return __users
}
*/

 


function searchUsers (query, token, callback){
    if( typeof query !== "string") throw new Error ( query + " it's not a string")
    



    query = query.toLowerCase()
    call ('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined,
    { Authorization: `Bearer ${token}` }, (error, status, responseBody) => {
        if (error){console.error(error) } 
        if (status === 200) {
            const apiUsers =  JSON.parse(responseBody)

           const users = apiUsers.filter(function (user) {const { name = '', surname = '', username } = user
    
           return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || username.toLowerCase().includes(query)})
           
           const _users = users.map(function ({ name, surname, username }) {

            debugger
            if (name === undefined && surname === undefined) return {email: username}
            if (name === undefined) return {surname, email: username}
            if (surname === undefined) return {name, email: username}
            
            return { name, surname, email: username }
         })
         callback(_users)
        } 
           
            
        
    }) 
         
    
}