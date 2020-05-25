function toggleFollowUser(token, followEmail, callback) {
//   if (typeof userEmail !== "string")
//     throw new TypeError(userEmail + " is not a string");
//   if (!EMAIL_REGEX.test(userEmail))
//     throw new Error(userEmail + " is not an e-mail");

//   if (typeof followEmail !== "string")
//     throw new TypeError(followEmail + " is not a string");
//   if (!EMAIL_REGEX.test(followEmail))
//     throw new Error(followEmail + " is not an e-mail");

  let body = undefined;
  let url = "https://skylabcoders.herokuapp.com/api/v2/users";
  let headers = { Authorization: `Bearer ${token}` };

  call("GET", url, body, headers, (error, status, response) => {
    if (error) return callback(error);

    if (status === 200) {
      let {following = []} = JSON.parse(response);

      if (following.includes(followEmail)){
        following = following.filter(email => followEmail !== email )
      } else following.push(followEmail)

      // if (!user.followers) {
      //   user.followers = [followEmail];
      // } else {
      //   let index = user.followers.indexOf(followEmail);
      //   if (index === -1) {user.followers.push(followEmail)}else user.followers.splice(index, 1);
      // }

      body = JSON.stringify({ following });
      headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };

      call("PATCH", url, body, headers, (error, status, response) => {
        if (error) return callback(error);
        if (status === 204) {
          return callback(undefined, followEmail);
        }
        const { error: responseError } = JSON.parse(response);
  
        if (responseError) callback(new Error(responseError));
      });

    }

    const { error: responseError } = JSON.parse(response);
    if (responseError) callback(new Error(responseError));
  });
}
