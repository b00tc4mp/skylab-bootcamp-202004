function searchUsers(query) {
  
    const user = users.filter(function(user){
        return user.name.includes(query)  ||  user.surename.includes(query) || user.email.includes(query)
    })
    
    return user
}




