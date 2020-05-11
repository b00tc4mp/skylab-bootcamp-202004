
function searchArtists(query, callback) {
    const queryUrl = query.split(" ").join("%20")
    const limit ="&type=track&offset=0&limit=5"
    const trackUrl=queryUrl.concat(limit)
    const results = []
    
    query.split(" ").join("%20").concat("")

    call("GET", "https://api.spotify.com/v1/search?q=dinamita%20pa%20los%20pollos", undefined,
    {"Content-Type": "application/json","Authorization": `Bearer: ${token}`}, (error,status,body) =>  {
        if (error) console.error(error)

        if (status === 200){
            const {name, id, previousUrl} = JSON.parse(body)
            callback(undefined,song)
        }
    })
  
}