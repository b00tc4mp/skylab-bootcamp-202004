const token = "BQBfGLQKbJf5RIo6Xv__zV8B4Jlc_hygceZRDMfENfUPxZ3DPCgQ8K9f7ZyM8-M3L3P7B2tOfDANrvy18To6JcXxW2FOaHTIC9z_kj5VMHwPJtZIRNcCce9LSCOKHgbUV_Wdg9kjT0DQEFAtEmM_wxF9nvYvAP-u7I8NXxLLIAeJUNAnwyuYree8"
function trackSearch(token, callback) {

    // query.split(" ").join("%20")

    call("GET", "https://api.spotify.com/v1/search?q=dinamita%20pa%20los%20pollos", undefined,
    {"Content-Type": "application/json","Authorization": `Bearer: ${token}`}, (error,status,body) =>  {
        if (error) console.error(error)

        if (status === 200){
            const {name, id, previousUrl} = JSON.parse(body)
            callback(undefined,song)
        }
    })


}