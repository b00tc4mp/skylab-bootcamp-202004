function toogleFollowComment(token, userCommentId, fwitter, cardColor, message, callback) {
    String.validate.notVoid(token);
    String.validate.notVoid(userCommentId);
    Function.validate(callback);

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined,
        { Authorization: `Bearer ${token}` }, (error, status, body) => {
            if (error) return callback(error);

            if (status === 200) {
                const user = JSON.parse(body);
                if(user.red === undefined) user.red = []
                if(user.yellow === undefined) user.yellow = []
                if(user.green === undefined) user.green = []

                const { red = [], yellow = [], green = [] } = user
                let actualIndexId
                let actualIndexMessage

                switch (cardColor) {
                    case 'red':

                       
                        actualIndexId = red.map((red) => { return red.id }).indexOf(userCommentId)
                        actualIndexMessage = red.map((red) => {return red.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) red.splice(actualIndexMessage, 1)
                        else red.push({id: userCommentId, message: message})
                
                        break
                    case 'yellow':

                        actualIndexId = yellow.map((yellow) => { return yellow.id }).indexOf(userCommentId)
                        actualIndexMessage = yellow.map((yellow) => {return yellow.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) yellow.splice(actualIndexMessage, 1)
                        else yellow.push({id: userCommentId, message: message})


                        break
                    case 'green':

                        actualIndexId = green.map((green) => { return green.id }).indexOf(userCommentId)
                        actualIndexMessage = green.map((green) => {return green.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) green.splice(actualIndexMessage, 1)
                        else green.push({id: userCommentId, message: message})


                        break

                    default:
                        return callback(error)
                }





                call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify(user),
                    { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
                    (error, status, body) => {
                        if (error) return callback(error);

                        if (status === 204) {
                            callback(undefined, fwitter);
                        } else {
                            const { error } = JSON.parse(body);

                            callback(new Error(error));
                        }
                    }
                );
            }
        }
    );
}