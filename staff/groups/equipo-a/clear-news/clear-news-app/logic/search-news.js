function searchNews(query, language, sortBy, counter,callback) {
       
    String.validate.notVoid(query);
    Function.validate(callback);

    let numberOfNews

    switch (counter) {
        case 0: numberOfNews=20
            break;
        case 1: numberOfNews=40
            break;
        case 2: numberOfNews=60
            break;
        case 3: numberOfNews=80
            break;
        case 4: numberOfNews=100
            break;
        default:numberOfNews=20
            break;
    }   

    call('GET', `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=${numberOfNews}&apiKey=ca31e7b3e6ba43198e30c837afcf0021`,
        undefined,
        undefined,
        (error, status, body) => {
            if (error) return callback(error);

            if (status === 200) {
                const {articles} = JSON.parse(body);

                callback(articles);
     
            } else {
                const { error } = JSON.parse(body);

                callback(new Error(error));
            }
        });
}