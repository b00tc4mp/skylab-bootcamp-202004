function createUrl({order, dir, name, text, type, color, colorLimit,mana, cmc, power, toughtness, loyalty, limit, format, legality, set, block, rarity, artist, flavor, lore, language}) {
    let query = `include_multilingual=${!language}${order ? '&order='+order : '' }${dir ? '&dir='+dir : ''}&q=`

    const options = []
    if(name) name = name.split(' ').join('+')
    createAndPush(name, name,'+')
    if(text) text = text.split(' ').join('+oracle:')
    createAndPush(text,'oracle:'+text,'+')
    createAndPush(type, 'type:'+type,'+')
    createAndPush(color, 'color'+colorLimit+color,'+')
    createAndPush(mana, 'mana:'+mana, '+')
    createAndPush(cmc, 'cmc'+limit+cmc, '+')
    createAndPush(power, 'pow'+limit+power, '+')
    createAndPush(toughtness, 'tou'+limit+toughtness, '+')
    createAndPush(loyalty, 'loy'+limit+loyalty, '+')
    createAndPush(legality && format, legality+':'+format, '+')
    createAndPush(set, 'set:'+set, '+')
    createAndPush(block, 'block:'+block, '+')

    if (rarity) {
        createAndPush(rarity, '(rarity:'+rarity[0], `${rarity.length > 1 ? '+' : ')+'}`)
        for (let i = 1; i < rarity.length; i++) createAndPush(rarity, 'OR+rarity:'+rarity[i], `${i !== (rarity.length-1) ? '+' : ')+'}`)
    }
    if(artist) artist = artist.split(' ').join('+artist:')
    createAndPush(artist, 'artist:'+artist, '+')
    if(flavor) flavor = flavor.split(' ').join('+flavor:')
    createAndPush(flavor, 'flavor:'+flavor, '+')
    if(lore) lore = lore.split(' ').join('+lore:')
    createAndPush(lore, 'lore:'+lore, '+')
    createAndPush(language, 'lang:'+language, '')
    
    options.forEach(option => {
        if (option) query += option.value+option.separator
    })

    return query

    function createAndPush(filterOption, value, separator) {
        if (filterOption) {
            options.push({value, separator})
        }
    }
}