
/**

 * search an artist albums

 * 

 * @param {string} token The spotify token. 

 * @param {string} id The spotify artist id.

 * @param {callback} callback The expression to be called after search an album from an artist, reciving all artist albums or throwing Error.

 * 

 * @throws {Error} If artist id its wrong

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function searchArtistAlbum(id,token, callback) {
    String.validate.notVoid(token)
    String.validate(token)
  
      String.validate(id)
  
      Function.validate(callback)
  
    const queryUrl = `/${id}`.concat('/albums');
  
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
          const results = [],
            artistsArray = [];
  
          const { items } = JSON.parse(body);
  
          for (let i = 0; i < items.length; i++) {
            let {
              images: [, { url: image }],
              id,
              name,
              artists,
            } = items[i];
            debugger;
  
            for (let j = 0; j < artists.length; j++) {
              artistsArray.push(artists[j].name);
            }
            let object = { image, id, name, artistsArray };
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
  