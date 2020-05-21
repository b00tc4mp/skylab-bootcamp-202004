module.exports = data =>  {
    let contact = {}

    let formInputs = data.split('&')
    formInputs = formInputs.map(input => input.split('='))
    formInputs.forEach(input => contact[input[0].trim()]=input[1].trim().replace('%40', '@'))

    return contact
}

