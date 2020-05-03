function Tweets ( { allTweets } ){
return <section className="tweets">
{
    allTweets.length ?
    <ul>{ 
        allTweets.map(({ name, surname, text, date }) =>
        <li>
            <p>{date}</p>
            <p>{name} {surname}</p>
            <p>{text}</p>
        </li>
  )} 
  </ul> 
    :<Feedback message="no tweets yet" level=""/>
}
</section>

}