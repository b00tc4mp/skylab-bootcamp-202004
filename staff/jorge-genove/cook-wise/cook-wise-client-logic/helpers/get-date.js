
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday','Friday','Saturday'];

module.exports = () => {
    const numericDay = new Date().getDay();

   
    debugger
    return WEEKDAYS[numericDay].toLowerCase();

}

