
function toggleFollowUser(token, id,callback) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof following !== 'string') throw new TypeError(following + ' is not a string')
    if (!EMAIL_REGEX.test(following)) throw new Error(following + ' is not an e-mail')

    // DONE check if array of following exists, otherwise create new array 
    // TODO if follower user (id) it is already in array, then remove it, otherwise add it
    // TODO call to update user (body => { following: [...] })
    let count = 0;
    call('GET',
        'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { "Authorization": `Bearer: ${token}` }, (error, status, body) => {
            if (status === 200) {
                if (error) return callback(error)

                const { user } = JSON.parse(body)
                const { following =[] } = user
                const index = following.indexOf(id)

                if (index > -1) following.splice(index,1)
                else following.push(id)
                // const index = (user.following || (user.following=[])).indexOf(following)
                // if (index > -1) user.following.splice(index,1)
                // else user.following.push(id)

                call('PATCH',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                JSON.stringify(follo),
                { "Content-type": "application/json", "Authorization": `Bearer ${token}` }, (error, status, body) => {
                    if (error) return callback(error)
                    if (status === 204) {
                        callback(status)
                        
                    } else {
                        const { error } = JSON.parse(body)

                        callback(new Error(error))
                    }
                })
        }
    })
}
        
        
