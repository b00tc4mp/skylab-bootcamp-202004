function searchUser(query) {

const user = users.filter(function(user){
    return user.name === query || user.email === query || user.surname
})

return user
}