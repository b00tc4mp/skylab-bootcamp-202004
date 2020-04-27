function lookUsers(data, users) {
    if (typeof data != 'string') throw new TypeError(data + ' is not a string')
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
    if (typeof name === 'undefined' && data.length != 0) { //tendriamos que sacar las contraseñas para no pasarselas al html y se podria poner las busquedas a lowercase
        results = users.filter(function(value){
            let emailVal = true
            let nameVal = true
            for (var i = 0; i < data.length; i++){
                if((data[i] != value.name[i] || nameVal === false) && (data[i] != value.email[i] || emailVal===false)){ 
                    return false
                }
                if(data[i] != value.email[i]){
                    emailVal = false;
                }
                if(data[i] != value.name[i]){
                    nameVal = false;
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

