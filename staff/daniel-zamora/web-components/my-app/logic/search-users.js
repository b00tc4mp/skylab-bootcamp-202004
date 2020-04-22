function searchUsers(query) {
    // TODO find users matching query in name, surname, email
  
    const _users = users.filter(function(user) {
        return query === user.name || query === user.surname || query === user.email;
    });

    if(_users.length === 0) throw new Error ('The user don`t exist!');
  

    // const { name, surname, email: _email } =_users

   

    var txt='';
    for(var i = 0; i<_users.length;i++){
        txt+= _users[i].name + ' '
        txt+= _users[i].surname +' '
        txt+= _users[i].email + '.'
    }


    // return `${name} ${surname} ${_email}`
    return txt
}

