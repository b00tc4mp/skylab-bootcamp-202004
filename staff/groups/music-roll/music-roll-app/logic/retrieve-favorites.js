/**

 * Get the user favorites

 * 

 * @param {string} token The user token. 

 * @param {callback} callback The expression to be called retrieve the users favorites

 * @throws {Error} If the call had network error

 * @throws {Error} If the status its not correct

 * @throws {Error} If the token is not correct or its expired

 */


function retrieveFavorites(token, callback) {
  String.validate.notVoid(token);

  Function.validate(callback);

  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        const user = JSON.parse(body);
        const results = {}
        if (user.favoriteArtist) results.favoriteArtist = user.favoriteArtist;
        if (user.favoriteAlbums) results.favoriteAlbum = user.favoriteAlbums;
        if (user.favoriteTracks) results.favoriteTrack = user.favoriteTracks;

        

        callback(undefined, results);
      } else {
        const { error } = JSON.parse(body);

        callback(new Error(error));
      }
    }
  );
}
