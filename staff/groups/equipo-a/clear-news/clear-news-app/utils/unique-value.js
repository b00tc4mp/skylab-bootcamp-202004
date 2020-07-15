function getUnique(array, key){
    return [...new Map (array.map(x => [key(x), x])).values()
    ]

}