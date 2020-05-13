function profileChange(token, userUpdate={ name, surname, email, password, newPassword, interests, country }, callback) {
    Email.validate(email);
    
    String.validate.notVoid(password);
    String.validate(password);

    if(newPassword){
        String.validate.notVoid(newPassword);
        String.validate(newPassword);
        let oldPassword
        return oldPassword=password
    }
    
    String.validate.notVoid(name);
    String.validate(name);

    String.validate.notVoid(surname);
    String.validate(surname);

    Function.validate(callback);

    String.validate.notVoid(token);
    String.validate(token);

    String.validate.notVoid(country);
    String.validate(country);

    let count = 0
    for (interest in interests) {
        if (interests[interest] === false) {
            count++
        }
    }

    if (count === 7) {
        callback(new Error('Kindly choose one topic.'));

    } else {
        call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(userUpdate),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
            (error, status, body) => {
                if (error) return callback(error)

                if (status === 204) {
                    callback(success);
                   
                } else {
                    const { error } = JSON.parse(body);
                    callback(new Error(error));
                }

            });
    }
}
    
 