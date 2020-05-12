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
