
/**

 * search an album

 * 

 * @param {string} token The spotify token. 

 * @param {string} query The query given by the user.

 * @param {callback} callback The expression to be called after search an album, reciving an album or throwing Error.

 * 

 * @throws {TypeError} When query its not finded 

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */




function searchAlbum(token, query, callback) {
   ;
  

  const queryUrl = encodeURI(query).concat(`&type=album&offset=0&limit=5`);

  call(
    "GET",
    `https://api.spotify.com/v1/search?q=${queryUrl}`,
    undefined,
    { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) console.log(error);
      console.log(status);
       ;
      if (status === 200) {
        const results = [],
          artistsArray = [];

        const {
          albums: { items, total },
        } = JSON.parse(body);

        if (total === 0) {
          return callback(new Error("Matches not found"));
        }

        for (let i = 0; i < items.length; i++) {
          let {
            images: [, { url: image }],
            id,
            name,
            artists,
          } = items[i];

           ;

          for (let j = 0; j < artists.length; j++) {
            artistsArray.push(artists[j].name);
          }
          let object = { image, id, name, artistsArray };
          results.push(object);
        }
         ;
        callback(undefined, results);
      } else {
        const { error } = JSON.parse(body);
        callback(new Error(error.message));
      }
    }
  );
}
