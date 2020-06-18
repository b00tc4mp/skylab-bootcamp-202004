import moment from 'moment'

module.exports = () => {

    let date = {}
    date.stringDay = moment().format('dddd')
    date.day = moment().date()
    date.month = moment().format('MMMM')
    date.hour = moment().format('HH:mm')

    return date


}