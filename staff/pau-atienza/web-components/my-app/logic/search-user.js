function searchUser(input){
    if (typeof input !== 'string') throw new TypeError(input + ' is not a string');
    const tempUser = users.filter(
        function({name: name, surname: surname, email, password}){
            return name.includes(input) || surname.includes(input)
    });// no email searches for security reasons (@, .com, gmail, etc.)

    var results= tempUser.map((user) => {return {name: user.name, surname: user.surname, email: user.email}})//Sanitising
    
    return results
}