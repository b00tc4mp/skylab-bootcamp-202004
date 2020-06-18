import moment from 'moment'

module.exports = () => {

    const week = []
    for (let i = 0; i < 7; i++) {

        week.push({ day: moment().add(i, 'day').date(), dayString: moment().add(i, 'day').format('ddd') })
    }
    return week

}


