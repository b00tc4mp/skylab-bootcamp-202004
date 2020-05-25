//Ordena los tweets para que los mas nuevos aparezcan encima de la pantalla
function sortTweets(tweets){
    //Comprueba que tweets es un array con valores correctos
    if(typeof tweets!== typeof []) throw new TypeError(tweets + " is not an array")
    if( tweets.some(tweet=>tweet.date===undefined|| tweet.message===undefined)) throw new TypeError(tweets + "is not an array of tweets");

    let result= tweets.map(tweet=> tweet);//Crea una copia del array de tweets y lo reordena
    result.sort((a,b)=>b.date-a.date);
    return result;
}