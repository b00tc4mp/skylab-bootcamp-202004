
/**
 * Checks user credentials.
 * 
 * @param {object} fwitters The Array of fwitters. 
 * @return {object} Return a fwitters array in ascendent order.  
 *  
 * @throws {Error} If the fwitters array is empty  throw the Error.
 */


const creatFwitterArray = (fwitters) => {
    if(fwitters.length === 0) throw new Error('The array is empty.');

    const result = []

    fwitters.map(({ email, idUser, nameUser, surnameUser, fwitter }) => {
        if (typeof fwitter !== undefined) {
            fwitter.map(({ id, name, fwitt }) => {
                fwitt.map(({ message, date, _date, greenCard, yellowCard, redCard, bckgRed = '' , bckgYellow = '', bckgGreen = ''}) => {
                    if (_date) result.push({ email, idUser, nameUser, surnameUser,id, name, message, date, _date,  greenCard, yellowCard, redCard, bckgRed , bckgYellow, bckgGreen})
                })
            })
        } else {
            result.sort(function (a, b) {
                return parseInt(b._date) - parseInt(a._date);
            });
            //result.length = 20;
            return fwitters
        }
    })

    result.sort(function (a, b) {
        return parseInt(b._date) - parseInt(a._date);
    });
    //result.length = 20;
    return result
}


/**
 * After exectute return.
 * 
 * @creatFwitterArray return a ascendent order array.
 *
 */