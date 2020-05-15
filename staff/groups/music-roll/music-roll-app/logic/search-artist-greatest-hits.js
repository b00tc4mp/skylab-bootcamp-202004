
/**

 * search an artist albums

 * 

 * @param {string} token The spotify token. 

 * @param {string} id The spotify artist id.

 * @param {callback} callback The expression to be called after search the greatest hits from an artist, reciving tracks or throwing Error.

 * 

 * @throws {Error} If artist id its wrong

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function searchArtistGreatestHits(id,token, callback) {
    String.validate.notVoid(token)
    String.validate(token)
  
      String.validate(id)
  
      Function.validate(callback)
  
    const queryUrl = `/${id}`.concat('/top-tracks?country=ES');
  
    call(
      "GET",
      `https://api.spotify.com/v1/artists${queryUrl}`,
      undefined,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      (error, status, body) => {
        if (error) console.log(error);
        console.log(status)
        debugger;
        if (status === 200) {
          const results = []
           
  
          const { tracks } = JSON.parse(body);
  
          for (let i = 0; i < tracks.length; i++) {
            let {
              name,
              id,
              preview_url,
              
            } = tracks[i];
            debugger;
  
            
            
            let object = { preview_url, id, name };
            results.push(object);
          }
          debugger;
          callback(undefined, results);
        }else{
          const {error} = JSON.parse(body)
          callback(new Error(error.message))
        }
      }
    );
  }
  