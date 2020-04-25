//Devuelve un usuario del array a partir de un campo 
function searchUser(input){
    //Comprueba que se le está dando un valor correcto a la busqueda
    if (typeof input !== 'string') throw new TypeError(input + ' is not a string');
    input=input.toLowerCase();
    //if (!TEXT_REGEX.test(input)) throw new Error(input + ' is not an e-mail');
    //Devuelve el usuario que tenga el input que se está buscando

    const user = users.filter(function(user){return user.email.toLowerCase().includes(input) || user.name.toLowerCase().includes(input) || user.surname.toLowerCase().includes(input)});
    var tempUser=[]; //Le añades el mail, el nombre y el apellido
    for (let i=0;i<user.length;i++)
        tempUser[i] = {name: user[i].name, surname: user[i].surname, email: user[i].email}
    
    
        
    return tempUser;
}

//Name, surname and email (not password)