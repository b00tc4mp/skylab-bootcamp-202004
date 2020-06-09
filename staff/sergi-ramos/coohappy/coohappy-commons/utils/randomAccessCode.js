module.exports = name => {

    let accessCode = Math.random() * 100000

    accessCode = Math.trunc(accessCode)
    accessCode += name.replace(/ /g, "")
    return accessCode
}