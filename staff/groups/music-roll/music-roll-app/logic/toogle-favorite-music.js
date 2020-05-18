
/**

 * search an artist

 * 

 * @param {string} token The user app token 

 * @param {object} favorite the object with favorite stuff,

 * @param {string} flag the variable that track what kaind of of favorite the user tracks
 
 * @param {callback} callback The expression to be throwed after follow a track, album or artist, and put the info on the user database or throw an error

 * 

 * @throws {Error} If have network problems.

 * @throws {Erorr} If status its not the expectet

 

 */

function toggleFavoriteMusic(flag, token, favorite, callback) {
   ;

  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,
    {
      Authorization: `Bearer ${token}`
    },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
       
        const user = JSON.parse(body);
        if (user[flag]) {
          const index = user[flag].indexOf(favorite);
          index === -1
            ? user[flag].push(favorite)
            : user[flag].splice(index, 1);
        } else {
          user[flag] = [favorite];
        }
        call(
          "PATCH",
          "https://skylabcoders.herokuapp.com/api/v2/users",
          JSON.stringify(user),
          {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          (error, status, body) => {
            if (error) return callback(error);

            if (status === 204) { 
              callback();
            } else {
              const { error } = JSON.parse(body);

              callback(new Error(error));
            }
          }
        );
      } else {
        const { error } = JSON.parse(body);
        callback(new Error(error));
      }
    }
  );
}
