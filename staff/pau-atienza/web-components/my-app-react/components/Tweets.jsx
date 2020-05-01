function Tweets({email}){
    debugger
    let tweets = retrieveTweets(email)

    const printTweets = ()=>{return tweets.map(
        ({name, surname, text, date}) => 
    <li>{`${name} ${surname} tweeted: ${text} ${date.toString().slice(4,21)}`}</li>
    )}

    return <section className="tweets">
            <ul>{printTweets()}   
            </ul>
        </section>
}