/**

 * search an artist

 * 

 * @param {string} token The spotify token. 

 * @param {string} query The query given by the user.

 * @param {callback} callback The expression to be called after search an artist, reciving an artist or throwing Error.

 * 

 * @throws {TypeError} When query its not finded 

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function searchArtist(token, query, callback) {

    String.validate.notVoid(token);
  String.validate(token);

  String.validate(query);

  Function.validate(callback);
    
    const queryUrl = encodeURI(query).concat(`&type=artist&offset=0&limit=5`);

    call("GET", `https://api.spotify.com/v1/search?q=${queryUrl}`,
    undefined, {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    (error, status, body) =>  {
        if (error) console.error(error)

        if (status === 200) {
            const results = [];
            
            const { artists : { items, total } } = JSON.parse(body);

            if (total === 0) { 
                return callback(new Error('Not matches found'))
            } 

            items.map(({name, id, images}) => {
                const object = {};
                object.name = name;
                object.id = id;
                if (images.length != 0) {
                    object.images = images[1].url;
                    results.push(object)
                } else {
                    object.images = "https://i.pinimg.com/originals/7a/ec/a5/7aeca525afa2209807c15da821b2f2c6.png";
                results.push(object)
                }
            })           
            callback(undefined, results)
        }
    })
}