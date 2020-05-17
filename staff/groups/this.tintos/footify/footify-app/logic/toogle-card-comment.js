/**
 * Checks user credentials.
 * 
 * @param {string} token The token of the current user. 
 * @param {string} userCommentId The id of the user who has commented.
 * @param {string} fwitter All the information of the person who has fwitted(date, number of cards, id user, id player...).
 * @param {string} cardColor Type of card the current user clicked
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error and fwitter array.
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} fwitter It receives a array in case credentials are correct.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If does not match the expected format.
 */

function toogleFollowComment(token, userCommentId, fwitter, cardColor, message, callback) {
    String.validate.notVoid(token);
    String.validate.notVoid(userCommentId);
    Function.validate(callback);

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined,
        { Authorization: `Bearer ${token}` }, (error, status, body) => {
            if (error) return callback(error);

            if (status === 200) {
                const user = JSON.parse(body);
                if (user.red === undefined) user.red = []
                if (user.yellow === undefined) user.yellow = []
                if (user.green === undefined) user.green = []
              
                
                let { red = [], yellow = [], green = []} = user
                let actualIndexId
                let actualIndexMessage
                

                switch (cardColor) {
                    case 'red':


                        actualIndexId = red.map((red) => { return red.id }).indexOf(userCommentId)
                        actualIndexMessage = red.map((red) => { return red.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) { red.splice(actualIndexMessage, 1) }
                        else {

                            red.push({ id: userCommentId, message: message })
                            

                            actualIndexId = yellow.map((yellow) => { return yellow.id }).indexOf(userCommentId)
                            actualIndexMessage = yellow.map((yellow) => { return yellow.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) yellow.splice(actualIndexMessage, 1)

                            actualIndexId = green.map((green) => { return green.id }).indexOf(userCommentId)
                            actualIndexMessage = green.map((green) => { return green.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) green.splice(actualIndexMessage, 1)

                        }

                        break
                    case 'yellow':

                        actualIndexId = yellow.map((yellow) => { return yellow.id }).indexOf(userCommentId)
                        actualIndexMessage = yellow.map((yellow) => { return yellow.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) { yellow.splice(actualIndexMessage, 1) }
                        else {

                            yellow.push({ id: userCommentId, message: message })

                            actualIndexId = red.map((red) => { return red.id }).indexOf(userCommentId)
                            actualIndexMessage = red.map((red) => { return red.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) { red.splice(actualIndexMessage, 1) }

                            actualIndexId = green.map((green) => { return green.id }).indexOf(userCommentId)
                            actualIndexMessage = green.map((green) => { return green.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) green.splice(actualIndexMessage, 1)
                        }


                        break
                    case 'green':

                        actualIndexId = green.map((green) => { return green.id }).indexOf(userCommentId)
                        actualIndexMessage = green.map((green) => { return green.message }).indexOf(message)

                        if (actualIndexId !== -1 && actualIndexMessage !== -1) { green.splice(actualIndexMessage, 1) }
                        else {

                            green.push({ id: userCommentId, message: message })

                            actualIndexId = red.map((red) => { return red.id }).indexOf(userCommentId)
                            actualIndexMessage = red.map((red) => { return red.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) { red.splice(actualIndexMessage, 1) }

                            actualIndexId = yellow.map((yellow) => { return yellow.id }).indexOf(userCommentId)
                            actualIndexMessage = yellow.map((yellow) => { return yellow.message }).indexOf(message)

                            if (actualIndexId !== -1 && actualIndexMessage !== -1) { yellow.splice(actualIndexMessage, 1) }

                        }


                        break

                    default:
                        return callback(error)
                }





                call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify(user),
                    { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 204) {
                            callback(undefined, fwitter)
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    }
                )
            }
        }
    )
}
