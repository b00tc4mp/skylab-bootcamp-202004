function searchPlaylists(token, query, callback) {
 
  String.validate.notVoid(token)

  String.validate(query)

  Function.validate(callback)
    // const queryUrl = query
    //   .split(" ")
    //   .join("%20")
    //   //.concat('&type=playlist&limit=5');
  
  debugger
    call(
      "GET",
      `https://api.spotify.com/v1/search?q=${encodeURI(query)}&type=playlist&limit=5`,
      undefined,
      { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      (error, status, body) => {
        debugger
        if (error) callback(error)
        
        if (status === 200) {
          const queryBody = JSON.parse(body)
          const {playlists} = queryBody
          const { items } = playlists
          

          const results = items.map(({name, description, images, id}) => {
            const obj = {}
            obj.name = name
            obj.description = description
            obj.images = images[0].url
            obj.id = id
            return obj
        })
          callback(undefined, results)
        }else{
          const {error} = JSON.parse(body)
          callback(new Error(error.message))
        }
    })
}
  