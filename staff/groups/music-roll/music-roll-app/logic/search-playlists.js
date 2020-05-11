function searchPlaylists(token, query, callback) {
 
    const queryUrl = query
      .split(" ")
      .join("%20")
      .concat('&type=playlist&limit=5');
  
    call(
      "GET",
      `https://api.spotify.com/v1/search?q=${queryUrl}`,
      undefined,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      (error, status, body) => {
        if (error) console.log(error);
  
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
        }
    })
}
  