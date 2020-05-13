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
  