/**
 * Checks user credentials.
 * 
 * @param {string} playerId The id of player. 
 * @param {string} token The token of the current user.
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error.
 * 
 * @returns {Array|string} likes the Array of id's of the player user select as fav.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */


function toogleFollowPlayer(token, playerId, callback) {
  String.validate.notVoid(token);
  String.validate.notVoid(playerId);
  Function.validate(callback);

  call("GET","https://skylabcoders.herokuapp.com/api/v2/users",undefined,
    { Authorization: `Bearer ${token}` }, (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        const user = JSON.parse(body);

        const { likes = [] } = user

        const actualIndex = likes.indexOf(playerId);

        if (actualIndex !== -1) likes.splice(actualIndex, 1);  
        else likes.push(playerId)
        user.likes = likes

        call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify( user ),
          { Authorization: `Bearer ${token}`, "Content-type": "application/json"},
          (error, status, body) => {
            if (error) return callback(error);

            if (status === 204) {
              callback(undefined, likes);
            } else {
              const { error } = JSON.parse(body);

              callback(new Error(error));
            }
          }
        );
      }
    }
  );
}

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {Array} likes It receives a token in case credentials are correct.
 */