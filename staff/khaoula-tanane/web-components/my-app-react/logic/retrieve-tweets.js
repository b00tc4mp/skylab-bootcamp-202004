function retrieveTweets(token, callback) {
  // if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
  // if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

  // let user = retrieveUser(userEmail)
  // let visibleTweets = []

  // user.tweets && user.tweets.forEach(tweet => visibleTweets.push(tweet))

  // user.follows && user.follows.forEach(followedUser => followedUser.tweets.forEach(tweet => visibleTweets.push(tweet)))

  // return visibleTweets
  let body = undefined;
  let url = "https://skylabcoders.herokuapp.com/api/v2/users";
  let headers = { Authorization: `Bearer ${token}` };

  call("GET", url, body, headers, (error, status, response) => {
    if (error) return callback(error);
    if (status === 200) {
      let user = JSON.parse(response);
      let userTweets = [];
      if (user.tweets) userTweets = user.tweets;
      let userFollowers = [];
      if (user.followers) {
        userFollowers = user.followers;

        url = "https://skylabcoders.herokuapp.com/api/v2/users/all";
        call("GET", url, body, headers, (error, status, response) => {
          if (error) return callback(error);
          if (status === 200) {
            const allUsers = JSON.parse(response);
            const followers = allUsers.filter((user) => {
              return userFollowers.some((email) => {
                return email === user.username;
              });
            });

            let followersTweets = [];

            followers.forEach((follower) => {
              if (follower.tweets) followersTweets = followersTweets.concat(follower.tweets);
            });

           followersTweets = followersTweets.concat(userTweets);

            callback(undefined, followersTweets);
          }
          const { error: responseError } = JSON.parse(response);

          if (responseError) callback(new Error(responseError));
        });
      } else callback(undefined, userTweets);
    }

    const { error: responseError } = JSON.parse(response);
    if (responseError) callback(new Error(responseError));
  });
}
