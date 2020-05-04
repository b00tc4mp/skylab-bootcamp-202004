function lookUsers(query, token, callback){
    if (typeof query != 'string') throw new TypeError(query + ' is not a string')

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined, {'Authorization':`Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if (status === 200){
            const users = JSON.parse(body)
            let cache = ''
            let space = false
            let name
            let results = []
            for (var i = 0; i < query.length; i++) { 
                cache += query[i];
                if (query[i] === ' ') { //mejorar lo de cojer los espacios
                    name = cache;
                    if (space === true) throw new Error('search only 2 words or stop taping spaces u madafaker')
                    space = true
                    cache = ''
                }
            }
            if (typeof name === 'undefined' && query.length != 0) { //tendriamos que sacar las contraseñas para no pasarselas al html y se podria poner las busquedas a lowercase
                results = users.filter(function(value){
                    let emailVal = true
                    let nameVal = true
                    if(value.name){
                        for (var i = 0; i < query.length; i++){
                            if((query[i] != value.name[i] || nameVal === false) && (query[i] != value.username[i] || emailVal===false)){ 
                                return false
                            }
                            if(query[i] != value.username[i]){
                                emailVal = false;
                            }
                            if(query[i] != value.name[i]){
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
            if (results.length === 0) return callback('No matches found', undefined)
            callback(undefined, results)
        }else{
            const {error} = JSON.parse(body)
            callback(error)
        }

    })

}
















// function lookUsers(query, users) {
//     if (typeof query != 'string') throw new TypeError(query + ' is not a string')
//     if (query.length === 0) throw new TypeError('') //o poner shearching pero en otro color que no sea rojo
//     if (users.length <= 1) throw new Error('You are the only user of my app :(')
//     let cache = ''
//     let space = false
//     let name
//     let results = []
//     for (var i = 0; i < query.length; i++) { 
//         cache += query[i];
//         if (query[i] === ' ') { //mejorar lo de cojer los espacios
//             name = cache;
//             if (space === true) throw new Error('search only 2 words or stop taping spaces u madafaker')
//             space = true
//             cache = ''
//         }
//     }
//     if (typeof name === 'undefined' && query.length != 0) { //tendriamos que sacar las contraseñas para no pasarselas al html y se podria poner las busquedas a lowercase
//         results = users.filter(function(value){
//             let emailVal = true
//             let nameVal = true
//             for (var i = 0; i < query.length; i++){
//                 if((query[i] != value.name[i] || nameVal === false) && (query[i] != value.email[i] || emailVal===false)){ 
//                     return false
//                 }
//                 if(query[i] != value.email[i]){
//                     emailVal = false;
//                 }
//                 if(query[i] != value.name[i]){
//                     nameVal = false;
//                 }
//             }
//             return true
//         })
//     }
//     else{
//         results = users.filter(function(value){
//             var nameEqual = true;
//             for (var i = 0; i < value.name.length; i++){
//                 if(value.name[i] != name[i]){
//                     nameEqual = false
//                 }
//             }
//             if(nameEqual){
//                 for (var i = 0; i < cache.length; i++){
//                     if(cache[i] != value.surname[i]){
//                         return false
//                     }
//                 }
//                 return true
//             }
//             else{
//                 return false
//             }
//         })
//     }
//     if (results.length === 0)throw new Error('No matches found')
//     return results;
// }

