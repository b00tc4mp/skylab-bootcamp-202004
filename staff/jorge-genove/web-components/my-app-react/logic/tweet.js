function tweet(token, message, callback) {
  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        const currentUser = JSON.parse(body);
        const { tweets = [] } = currentUser;

        tweets.push({ message: message, date: Date(Date.now).slice(0, 24) });
        const tweestString = JSON.stringify({ tweets });

        call(
          "PATCH",
          "https://skylabcoders.herokuapp.com/api/v2/users",
          tweestString,
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
      }
    }
  );
}
