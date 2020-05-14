/**
 * Takes a an object with the search conditions and generates a url ready for a request following the Scryfall API protocols
 * 
 * @param {string} order the parameter determining the order in which results will be shown
 * @param {string} dir if the order wil be ascendant or descendant
 * @param {string} name text that should appear in the name of the card
 * @param {string} text text that should appear in the content of the card
 * @param {string} type content of the typeline of the card
 * @param {string} color color/s of the card
 * @param {string} colorLimit string with a comparative operatior that determines how to compare the colors of the card with the colors in the input color
 * @param {string} mana symbols that should be included in the manacost
 * @param {string} cmc number string that refers to the cmc of the card
 * @param {string} power number string that refers to the power of the card
 * @param {string} toughtness number string that refers to the toughness of the card
 * @param {string} loyalty number string that refers to the loyalty of the card
 * @param {string} limit string with a comparative opertator to use with the values of "cmc", "power" or "toughness"
 * @param {string} format string with a format to check the legality of the card
 * @param {string} legality string that informs if the cards shoukld be legal, banned or restricted in the format provided in the variable "format"
 * @param {string} set set in which the card was printed
 * @param {string} block block in which the card was printed
 * @param {string} rarity the results will only show cards with the rarities included in this string
 * @param {string} artist the artist name of the card image should include this text 
 * @param {string} flavor the flavor text of the card should include this text
 * @param {string} lore this text can appear anywhere in the card (acts as title || text || artist || flavor)
 * @param {string} language string that determines the language of the searched cards
 * 
 * @throws {TypeError} if any of the inputs do not match the required formats
 */

function createUrl({order, dir, name, text, type, color, colorLimit,mana, cmc, power, toughtness, loyalty, limit, format, legality, set, block, rarity, artist, flavor, lore, language}) {
    let stringArgs = [order, dir, name, text, type, color, colorLimit,mana, limit, format, legality, set, block, rarity, artist, flavor, lore, language]
    let numberArgs = [cmc, power, toughtness, loyalty]

    stringArgs.forEach(arg => {
        if (typeof arg !== 'string' && typeof arg !== 'undefined') throw new TypeError( arg +' is not a string and is not undefined')
    })

    numberArgs.forEach(arg => {
        if (typeof arg !== 'string' && typeof arg !== 'boolean'&& typeof arg !== 'undefined') throw new TypeError(arg +' is different from a string and boolean and is not undefined')
    })
    
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