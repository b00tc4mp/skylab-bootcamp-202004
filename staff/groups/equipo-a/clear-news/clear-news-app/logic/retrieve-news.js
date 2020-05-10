function retrieveNews(token, callback) {
    debugger
    String.validate(token)

    Function.validate(callback)

    let myNews = []

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {

                let user = JSON.parse(body)

                const { categories, country, favorite = [] } = user

                let result = Object.keys(categories).map(function (key) { return [String(key), categories[key]] })

                let _categories = []

                for (let i in result) {
                    if (result[i][1]) {
                        _categories.push(result[i][0])
                    }
                }

                let counter = 0
          
                for (let i = 0; i < _categories.length; i++) {
                    call('GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=${_categories[i]}&apiKey=ca31e7b3e6ba43198e30c837afcf0021`,
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
                                        myNews.push({ name, author, title, description, url, urlToImage, publishedAt })

                                    }
                                    else {
                                        const name = "unknown"
                                        myNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                    }

                                }
                                myNews = myNews.map(({ name, author, title, description, url, urlToImage, publishedAt }) => {
                                    const _news = { name, author, title, description, url, urlToImage, publishedAt }
                                    _news.favorites = favorite.includes(title)
                                    return _news
                                })

                            } else {
                                const { error } = JSON.parse(body)
                                callback(new Error(error))
                            }

                            if (counter === _categories.length) callback(undefined, myNews)

                        })
                }

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}