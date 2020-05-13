


function searchAlbumTracks(id,token,callback) {

    String.validate.notVoid(token)

    String.validate(id)

    Function.validate(callback)

    const queryUrl = `/${id}`.concat('/tracks')
    
    call(
        "GET",
        `https://api.spotify.com/v1/albums${queryUrl}`,
        undefined,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error)console.log(error)

            if(status === 200){
              const results = []  
            const {items} = JSON.parse(body)
            for (let i = 0; i < items.length; i++){
                let {name, preview_url} = items[i]
                const object = {name, preview_url}
                results.push(object)
            }
            callback(undefined,results)
            }else{
                const {error : {message} } = JSON.parse(body)
                callback(new Error(message))
            }

})
}