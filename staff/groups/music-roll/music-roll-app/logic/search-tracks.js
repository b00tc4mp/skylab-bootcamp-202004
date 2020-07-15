/**

 * search tracks

 * 

 * @param {string} token The spotify token. 

 * @param {string} query The query given by the user.

 * @param {callback} callback The expression to be called after search a track, reciving tracks or throwing Error.

 * 

 * @throws {TypeError} When query its not finded 

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function searchTrack(token, query, callback) {
  String.validate.notVoid(token)
  String.validate(token)

  String.validate(query)

  Function.validate(callback)

  const queryUrl = encodeURI(query).concat(`&type=track&offset=0&limit=5`);
  const results = [];

  call("GET", `https://api.spotify.com/v1/search?q=${queryUrl}`,
    undefined, { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) console.log(error);
      console.log(status)
      if (status === 200) {
        
        const {tracks : { items, total}  } = JSON.parse(body)
        
        if( total === 0) {
          callback(new Error('Matches not found'))
        }
        for (let i = 0; i < items.length; i++) {
          let { name, album } = items[i];

          let { artists } = album;
          let artistName = artists[0].name;
          let { preview_url } = items[i];
          let object = { preview_url, name, artistName };
          results.push(object);
        }
        callback(undefined, results);
      }else{
        const {error} = JSON.parse(body)
        callback(new Error(error.message))
      }
    }
  );
}