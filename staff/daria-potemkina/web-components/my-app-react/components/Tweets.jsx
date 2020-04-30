function Tweets ( { allTweets } ){
return <section clsassName="tweets">
    <ul>{ allTweets.map(({ text, date }) =>{
        <li>
            <p>{text}</p>
            <p>{date}</p>
        </li>
    })} </ul> 

</section>

}