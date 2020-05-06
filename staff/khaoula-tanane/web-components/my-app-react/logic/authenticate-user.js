function authenticateUser(username, password, callback) {


  if (typeof password !== "string")
    throw new TypeError(password + " is not a string");
  if (!password.trim().length) throw new Error("password is empty or blank");

  const body = JSON.stringify({ username, password });
  const url = "https://skylabcoders.herokuapp.com/api/v2/users/auth";
  const headers = { "Content-type": "application/json" };

  call("POST", url, body, headers, (error, status, response) => {
    if (error) return callback(error);

    if (status === 200) {
      const { token } = JSON.parse(response);
      return callback(undefined, token);
    }

    const { error: responseError } = JSON.parse(response);
    if (responseError) callback(new Error(responseError));
  });
}
