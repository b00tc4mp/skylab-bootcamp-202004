function retrieveNews(token, callback) {
    String.validate(token)

    Function.validate(callback)

    const myNews = []

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {

                let user = JSON.parse(body)

                const { categories, country } = user

                let result = Object.keys(categories).map(function (key) { return [String(key), categories[key]] })

                let _categories = []

                for (let i in result) {
                    if (result[i][1]) {
                        _categories.push(result[i][0])
                    }
                }

                let counter = 0
                /* let URL
                if(country===undefined)
                URL=`https://newsapi.org/v2/top-headlines?category=${_categories[i]}&apiKey=f8ed27ae05b44313b6a87abfea6dc48b`
                else URL=`https://newsapi.org/v2/top-headlines?country=${country}&category=${_categories[i]}&apiKey=f8ed27ae05b44313b6a87abfea6dc48b` */

                for (let i = 0; i < _categories.length; i++) {
                    call('GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=${_categories[i]}&apiKey=f8ed27ae05b44313b6a87abfea6dc48b`,
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