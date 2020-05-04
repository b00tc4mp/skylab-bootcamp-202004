function sendTwit(tweet, token, callback ){
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users)', `{"twit": "${twit} }`, 
    `{ 'Content-type': 'application/json' }`, (error, status, text) =>{
        if (error) throw new Error(console.error(error) )
        if (status === 204) {
            call('PSOT', 'https://skylabcoders.herokuapp.com/api/v2/users/auth'), `{"username": ${email}, "password": ${password}}`, 
            {'Content-type': 'application/json'}, (error, status, response) => {
                if (error) throw new Error (console.error(error) )
                if (status === 200) {
                    const { token } =  JSON.parse(response)
                }
            }
        }
    }
    )

}