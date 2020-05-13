function toggleFavoriteMusic(flag, token, favorite, callback) {
  debugger;

  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,
    {
      Authorization: `Bearer ${token}`,
    },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {debugger
        debugger;

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

            if (status === 204) {debugger
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
