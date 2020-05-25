//Comprueba que la contraseña pertenece al usuario con ese email
function authenticateUser(email,password){
    //Comprueba que se están enviando los valores correctos
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail');
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string');
    if (!password.trim().length) throw new Error('password is empty or blank');

    //Busca en el array un usuario que comparta los valores
    const user=users.find(function(user){
        return user.email===email && user.password===password;
    })
    //Si ningún usuario cumple los requisitos lanza un error
    if(!user) throw new Error("wrong credentials")
}