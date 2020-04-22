function lookUsers(data, users) {
    if (typeof data != 'string') throw new TypeError('Not valid search')
    if (users.length <= 1) throw new Error('You are the only user of my app :(')
    let cache = ''
    let space = false
    let name
    let results = []
    for (var i = 0; i < data.length; i++) { 
        cache += data[i];
        if (data[i] === ' ') { //mejorar lo de cojer los espacios
            name = cache;
            if (space === true) throw new Error('search only 2 words')
            space = true
            cache = ''
        }
    }
    if (typeof name === 'undefined') {
        for (var i = 0; i < users.length; i++) {
            if(users[i].email === data || users[i].name === data){
                results.push({
                    name: users[i].name,
                    surname: users[i].surname,
                    email: users[i].email
                })
            }
        }
    } else {
        for (var i = 0; i < users.length; i++) {
            if(users[i].name === name || users[i].surname === cache){
                results.push({
                    name: users[i].name,
                    surname: users[i].surname,
                    email: users[i].email
                })
            }
        }

    }
    if (results.length === 0)throw new Error('No matches found')
    return results;
}