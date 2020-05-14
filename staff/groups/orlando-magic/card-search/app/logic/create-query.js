function createQuery(url) {
    String.validate.notVoid(url)
    if (!url.includes('include_multilingual') || !url.includes('order')) url = 'include_multilingual=false&order=name&' + url 
    
    let colorLimit
    let limit 
    let searchConditions = {}

    url = url.split('&')
    let index = url.length -1
    url = url.map(option => option.substring(option.indexOf('=')+1))

    searchConditions['include_multilingual'] = url[0]
    searchConditions['order'] = url[1]

    query = url[index].split('+')
    query = query.filter(option => option !== 'OR')
    query.forEach(option => {
        if (option.includes('color')) colorLimit = option.match(/<=|>=|>|<|=/)[0]
        else if (option.includes('cmc') || option.includes('tou') || option.includes('pow') || option.includes('low')) limit = option.match(/<=|>=|>|<|=/)[0] 
    })
    query = query.map(option =>option.split(/:|<=|>=|>|<|=/))

    if (colorLimit) searchConditions['colorLimit'] = colorLimit
    if (limit) searchConditions['limit'] = limit

    query.forEach(option => {
        if (option[0].includes('(')) option[0] = option[0].substring(1)
        if (option.length > 1) {
            if (option[1].includes(')')) option[1] = option[1].substring(0,option.length-1)

            if (searchConditions[option[0]]) searchConditions[option[0]] += option[1]
            else searchConditions[option[0]] = option[1]
        } else {
            if (searchConditions['name']) searchConditions['name'] += option[0]
            else searchConditions['name'] = option[0]
        }
    })

    return searchConditions

}