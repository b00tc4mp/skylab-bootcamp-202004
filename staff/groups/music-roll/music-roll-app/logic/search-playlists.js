
/**

 * search a playslist

 * 

 * @param {string} token The spotify token. 

 * @param {string} query The query given by the user.

 * @param {callback} callback The expression to be called after search a playlist, reciving a playlist or throwing Error.

 * 

 * @throws {TypeError} When query its not finded 

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function searchPlaylists(token, query, callback) {
 
  String.validate.notVoid(token)

  String.validate(query)

  Function.validate(callback)
    // const queryUrl = query
    //   .split(" ")
    //   .join("%20")
    //   //.concat('&type=playlist&limit=5');
  
   
    call(
      "GET",
      `https://api.spotify.com/v1/search?q=${encodeURI(query)}&type=playlist&limit=5`,
      undefined,
      { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      (error, status, body) => {
         
        if (error) callback(error)
        
        if (status === 200) {
        
          const { playlists: { items, total } } = JSON.parse(body);
          if(total === 0){
            callback(new Error('Not matches found'))
          }

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
  