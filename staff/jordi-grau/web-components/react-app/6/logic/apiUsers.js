function apiUsers(id, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/api/v2/users/${id}` )

    xhr.onload = function () {
        const user = JSON
        })
   
        callback(undefined, data)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
