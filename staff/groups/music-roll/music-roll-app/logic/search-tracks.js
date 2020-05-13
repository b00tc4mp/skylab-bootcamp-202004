function searchTrack(token, query, callback) {debugger
  String.validate.notVoid(token)
  String.validate(token)

    String.validate(query)

    Function.validate(callback)

  const queryUrl = query
    .split(" ")
    .join("%20")
    .concat(`&type=track&offset=0&limit=5`);
  const results = [];

  call(
    "GET",
    `https://api.spotify.com/v1/search?q=${queryUrl}`,
    undefined,
    { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) console.log(error);
      console.log(status)
      if (status === 200) {
        debugger;
        const queryBody = JSON.parse(body);
        const { tracks } = queryBody;
        const { items } = tracks;
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
