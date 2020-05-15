function retrieveTweets(email, token, callback) {
  debugger;
  let user = "";
  let followerUsers = [];
  let tweetArr = [];

  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users/all",
    undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        const users = JSON.parse(body);

        for (var i = 0; i < users.length; i++) {
          if (users[i].username === email) {
            user = users[i];
          }
        }
        let followersID = [];
        for (var j = 0; j < user.following.length; j++) {
          debugger;
          followersID.push(user.following[j]);
        }

        for (var i = 0; i < users.length; i++) {
          followersID.find((elemento) => {
            if (users[i].id === elemento) {
              followerUsers.push(users[i]);
            }
          });
        }

        let tweetsArray = [];

        for (var i = 0; i < followerUsers.length; i++) {
          debugger;
          let name = followerUsers[i].name;
          let surname = followerUsers[i].surname;
          let tweets = followerUsers[i].tweets || [];
          tweetsArray.push({ name, surname, tweets });
        }

        let tweets = user.tweets;
        let name = user.name;
        let surname = user.surname;
        tweetsArray.push({ tweets, name, surname });
        callback(undefined, tweetsArray);
      } else {
        const { error } = JSON.parse(body);
        callback(new Error(error));
      }
    }
  );
}
