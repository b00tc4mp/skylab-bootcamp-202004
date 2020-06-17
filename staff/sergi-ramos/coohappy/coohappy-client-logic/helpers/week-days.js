

module.exports = () => {

    const weekNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    const date = new Date()
    const week = []
    for (let i = 0; i < 7; i++) {
        week.push({
            day: date.getDate() + i,
            dayName: weekNames[i]
        })
    }

    return week
}


