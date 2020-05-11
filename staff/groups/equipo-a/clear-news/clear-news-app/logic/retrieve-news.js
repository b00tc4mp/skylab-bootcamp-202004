function retrieveNews(token, callback) {

    String.validate(token)

    Function.validate(callback)

    let myNews = []

    const numberOfPages = []

    const NEWS_FOR_PAGE = 20

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
                    call('GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=${_categories[i]}&apiKey=0d80af4c6ef6473aae5bb15fcf9eb625`,
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


                            if (counter === _categories.length){

                                for(let i = 0; i < Math.ceil(myNews.length/NEWS_FOR_PAGE); i++){
                                    numberOfPages.push(i+1)
                                }

                                callback(undefined, myNews, numberOfPages)
                            } 

                        })
                }

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}