function lookUsersData(data, users) {
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
            if(value.name){
                for (var i = 0; i < data.length; i++){
                    if((data[i] != value.name[i] || nameVal === false) && (data[i] != value.username[i] || emailVal===false)){ 
                        return false
                    }
                    if(data[i] != value.username[i]){
                        emailVal = false;
                    }
                    if(data[i] != value.name[i]){
                        nameVal = false;
                    }
                }
                return true
            }
        })
    }
    else{
        results = users.filter(function(value){
            if(value.name && value.surname){

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
            }
        })
    }
    if (results.length === 0)throw new Error('No matches found')

    return results;
}