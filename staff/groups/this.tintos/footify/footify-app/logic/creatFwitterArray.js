
const creatFwitterArray = (fwitters) => {
    const result = []

    fwitters.map(({ idUser, nameUser, surnameUser, fwitter }) => {
        if (Fwitter !== undefined) {
            fwitter.map(({ id, name, fwitt }) => {
                fwitt.map(({ message, date, _date, greenCard, yellowCard, redCard }) => {
                    if (_date) result.push({ idUser, nameUser, surnameUser, name, message, date, _date,  greenCard, yellowCard, redCard })
                })
            })
        } else {
            result.sort(function (a, b) {
                return parseInt(b._date) - parseInt(a._date);
            });
            result.length = 20;
            return fwitters
        }
    })

    result.sort(function (a, b) {
        return parseInt(b._date) - parseInt(a._date);
    });
    result.length = 20;
    return result
}

