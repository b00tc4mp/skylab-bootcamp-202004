
function registerUser(name,surname,email,password){
if(typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if(!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format')
    
    if(typeof surname !=='string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error (surname + ' does not match the format')
    
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' does not match the format')
   
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error(' password does not have the min length')
    
    const repeatMail = users.find(function (user) {
    return user.email === email;
    
    });

    if (repeatMail) {
      throw new Error("Email already exists MDRFUCKER");
    } else {
      users.push({
        name,
        surname,
        email,
        password,
      });
     
    }}