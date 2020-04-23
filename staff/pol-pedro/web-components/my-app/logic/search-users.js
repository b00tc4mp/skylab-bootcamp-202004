function lookUsers(data, users) {
    if (typeof data != 'string') throw new TypeError('Not valid search')
    if (data.length === 0) throw new TypeError('') //o poner shearching pero en otro color que no sea rojo
    if (users.length <= 1) throw new Error('You are the only user of my app :(')
    let cache = ''
    let space = false
    let name
    let results = []
    for (var i = 0; i < data.length; i++) { 
        cache += data[i];
        if (data[i] === ' ') { //mejorar lo de cojer los espacios
            name = cache;
            if (space === true) throw new Error('search only 2 words or stop taping spaces u madafaker')
            space = true
            cache = ''
        }
    }
    /*if (typeof name === 'undefined') {
        for (var i = 0; i < users.length; i++) {
            if(users[i].email === data || users[i].name === data){
                results.push({
                    name: users[i].name,
                    surname: users[i].surname,
                    email: users[i].email
                })
            }
        }q
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

    }*/

    if (typeof name === 'undefined' && data.length != 0) { //tendriamos que sacar las contraseñas para no pasarselas al html y se podria poner las busquedas a lowercase
        results = users.filter(function(value){
            for (var i = 0; i < data.length; i++){
                if(data[i] != value.name[i] && data[i] != value.email[i]){ //comprovar que una vez empieza si la primera letra de email o nombre no coincide no pueda validar por la segunda
                    return false
                }
            }
            return true
        })
    }
    else{
        results = users.filter(function(value){
            var nameEqual = true;
            for (var i = 0; i < value.name.length; i++){
                if(value.name[i] != name[i]){
                    nameEqual = false
                }
            }
            if(nameEqual){
                for (var i = 0; i < cache.length; i++){
                    if(cache[i] != value.surname[i]){
                        return false
                    }
                }
                return true
            }
            else{
                return false
            }
        })
    }
    if (results.length === 0)throw new Error('No matches found')
    return results;
}

