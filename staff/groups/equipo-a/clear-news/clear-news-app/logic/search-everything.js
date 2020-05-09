function searchEverything(query, language, sortBy,callback) {
       
    String.validate.notVoid(query);
    Function.validate(callback);

    if(language === undefined) language="en"
    
    if ( sortBy === undefined) sortBy = "publishedAt"

    call('GET', `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=20&apiKey=ca31e7b3e6ba43198e30c837afcf0021`,
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