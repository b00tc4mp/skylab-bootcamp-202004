function searchArtistAlbum(token, id, callback) {
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
  