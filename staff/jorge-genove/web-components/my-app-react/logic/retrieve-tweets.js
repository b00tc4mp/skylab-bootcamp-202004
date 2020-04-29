let user = ''
let followerUsers= []

function retrieveTweets(email) {
     // TODO my tweets and the tweets of the people this user follows
     
     
     for (var i = 0; i < users.length; i++){
    if (users[i].email === email){ user = users[i] }
}
let followersEmail = []
    for ( var j = 0;  j < user.following.length; j++){
        followersEmail.push(user.following[j]) 
    }

for (var i = 0; i < users.length; i++){
    followersEmail.find( (elemento) =>{
    if (users[i].email === elemento) {followerUsers.push(users[i])}
})}


let tweetsArray = []

for (var i = 0; i < followerUsers.length; i++){
    for (var k = 0; k < followerUsers[i].tweets.length; k++){
   let tweet =followerUsers[i].tweets
   let name = followerUsers[i].name
   let surname = followerUsers[i].surname
   tweetsArray.push({tweet, name, surname})
   



}
    
}

   let tweet =user.tweets
   let name = user.name
   let surname = user.surname
   tweetsArray.push({tweet, name, surname})

    


return tweetsArray

}


