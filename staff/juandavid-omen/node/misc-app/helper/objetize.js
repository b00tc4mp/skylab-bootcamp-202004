function objetize(data) {
    const arrList = data.toString().replace('%40', '@').split('&')

    let obj = {}

    arrList.forEach(element => {
        const split = element.split('=')
        obj[split[0]] = split[1]
    })
    
    return obj
}

module.exports = objetize