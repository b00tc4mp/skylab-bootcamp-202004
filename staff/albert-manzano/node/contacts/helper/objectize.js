function objetize(data, callback) {
    const arrList = data.toString().replace('%40', '@').split('&')

    let obj = {};
    arrList.forEach(element => {
        const split = element.split('=')
        obj[split[0]] = split[1]
    })
    return callback(obj)
}

