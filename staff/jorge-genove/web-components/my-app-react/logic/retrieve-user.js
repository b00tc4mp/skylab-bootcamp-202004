const retrieveUser = (token, callback) => {
  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        const { name, surname, username: email } = JSON.parse(body);
        callback(undefined, { name, surname, email });
      } else {
        const { error } = JSON.parse(body);

        callback(new Error(error));
      }
    }
  );
};
