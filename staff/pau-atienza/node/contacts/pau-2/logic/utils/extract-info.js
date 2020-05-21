 
module.exports = (data) => {

    const extractedData = {}
    data.toString().split('\r').forEach(string => {
        // if(string[0].trim() === '{'){extractedData.topline = string}
        // else{
            splitString = string.split(':')
            if (splitString[1]) extractedData[splitString[0].trim()] = splitString[1].trim()
            else if(splitString[0].trim()) extractedData['top'] = splitString[0].trim()               
        // }
    })
    top = extractedData.top.split(' ')
    extractedData.method = top[0]
    extractedData.path = top[1]
    extractedData.protocol = top[2]
    console.log(extractedData)
    return extractedData
}
