// function searchCard(order, dir, name, text, type, color, mana, cmc, power, toughtness, loyality, limit, format, standard, set, block, rarity, artist, flavor, lore, language, callback){
//     let url =  `https://api.scryfall.com/cards/search?include_multilingual=${!language}${order ? '&order='+order : '' }${dir ? '&dir='+dir : ''}&q=`

//     const options = []

//     if(name) name = name.split(' ').join('+')
//     createAndPush(name, name,'+')
//     createAndPush(text,'oracle:'+text,'+')
//     createAndPush(type, 'type:'+type,'+')
//     createAndPush(color, 'color='+color,'+')
//     createAndPush(mana, 'mana:'+mana, '+')
//     createAndPush(cmc, 'cmc'+limit+cmc, '+')
//     createAndPush(power, 'pow'+limit+power, '+')
//     createAndPush(toughtness, 'tou'+limit+toughtness, '+')
//     createAndPush(loyality, 'loy'+limit+loyality, '+')
//     createAndPush(format, 'f:'+standard, '+')
//     createAndPush(set, 'set:'+set, '+')
//     createAndPush(block, 'block:'+block, '+')

//     if (rarity) {
//         createAndPush(rarity, '(rarity:'+rarity[0], `${rarity.length > 1 ? '+' : ')+'}`)
//         for (let i = 1; i < rarity.length; i++) createAndPush(rarity, 'OR+rarity:'+rarity[i], `${i !== (rarity.length-1) ? '+' : ')+'}`)
//     }

//     createAndPush(artist, 'artist:'+artist, '+')
//     createAndPush(flavor, 'flavor:'+flavor, '+')
//     createAndPush(lore, 'lore:'+lore, '+')
//     createAndPush(language, 'lang:'+language, '')
    
//     options.forEach(option => {
//         if (option) url += option.value+option.separator
//     })
//     console.log(url)
    
//     try {
//         const xhr = new XMLHttpRequest()

//         xhr.open('GET',url)

//         xhr.onload = function() {
//             if (this.status == 200) {
//                 const {data} = JSON.parse(this.responseText)
//                 callback(undefined,data)
//             } else {
//                 callback(undefined,'No results found')
//             }
//         }

//         xhr.onerror = function() {
//             callback(new Error('network error'))
//         }

//         xhr.send()
//     } catch (error) {
//         if (error) callback(error.message)
//     }

//     function createAndPush(filterOption, value, separator) {
//         if (filterOption) {
//             options.push({value, separator})
//         }
//     }
// }

// searchCard('cmc', 'desc','lo',undefined,undefined, 'W', undefined, undefined, undefined, undefined, undefined, '=', 'legal', 'standard', undefined, undefined,'rm',undefined,undefined, undefined,'es', console.log)

function searchCard({order, dir, name, text, type, color, mana, cmc, power, toughtness, loyalty, limit, format, standard, set, block, rarity, artist, flavor, lore, language}, callback){
    let url =  `https://api.scryfall.com/cards/search?include_multilingual=${!language}${order ? '&order='+order : '' }${dir ? '&dir='+dir : ''}&q=`
    
    const options = []
    if(name) name = name.split(' ').join('+')
    createAndPush(name, name,'+')
    createAndPush(text,'oracle:'+text,'+')
    createAndPush(type, 'type:'+type,'+')
    createAndPush(color, 'color='+color,'+')
    createAndPush(mana, 'mana:'+mana, '+')
    createAndPush(cmc, 'cmc'+limit+cmc, '+')
    createAndPush(power, 'pow'+limit+power, '+')
    createAndPush(toughtness, 'tou'+limit+toughtness, '+')
    createAndPush(loyalty, 'loy'+limit+loyalty, '+')
    createAndPush(format, 'f:'+standard, '+')
    createAndPush(set, 'set:'+set, '+')
    createAndPush(block, 'block:'+block, '+')

    if (rarity) {
        createAndPush(rarity, '(rarity:'+rarity[0], `${rarity.length > 1 ? '+' : ')+'}`)
        for (let i = 1; i < rarity.length; i++) createAndPush(rarity, 'OR+rarity:'+rarity[i], `${i !== (rarity.length-1) ? '+' : ')+'}`)
    }

    createAndPush(artist, 'artist:'+artist, '+')
    createAndPush(flavor, 'flavor:'+flavor, '+')
    createAndPush(lore, 'lore:'+lore, '+')
    createAndPush(language, 'lang:'+language, '')
    
    options.forEach(option => {
        if (option) url += option.value+option.separator
    })
    console.log(url)
    
    try {
        const xhr = new XMLHttpRequest()

        xhr.open('GET',url)

        xhr.onload = function() {
            if (this.status == 200) {
                const {data} = JSON.parse(this.responseText)
                callback(undefined,data)
            } else {
                callback(undefined,'No results found')
            }
        }

        xhr.onerror = function() {
            callback(new Error('network error'))
        }

        xhr.send()
    } catch (error) {
        if (error) callback(error.message)
    }

    function createAndPush(filterOption, value, separator) {
        if (filterOption) {
            options.push({value, separator})
        }
    }
}

