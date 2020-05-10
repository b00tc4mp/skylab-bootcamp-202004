function retrieveFavNews(token, callback) {
    String.validate(token);

    Function.validate(callback);

    const favNews = [];

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {

                let user = JSON.parse(body)
                if (!user.favorite) callback("you still havent selected any news")
                const { favorite } = user

                let counter = 0

                favorite.forEach((item => {
                    let title = item.split().join('+') 
                    call('GET', `https://newsapi.org/v2/everything?q=${title}&apiKey=f8ed27ae05b44313b6a87abfea6dc48b`,
                        undefined,
                        undefined,
                        (error, status, body) => {
                            if (error) return callback(error)

                            if (status === 200) {
                                counter++
                                let news = JSON.parse(body)

                                const { articles } = news

                                for (let i in articles) {
                                    const { source, author, title, description, url, urlToImage, publishedAt } = articles[i]

                                    if (typeof source !== "undefined") {
                                        const { name } = source
                                        favNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                    }
                                    else {
                                        const name = "unknown"
                                        favNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                    }
                                }

                            } else {
                                const { error } = JSON.parse(body)
                                callback(new Error(error))
                            }

                            if (counter === favorites.length) callback(undefined, favNews)

                        })

                }
                )
                )
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}