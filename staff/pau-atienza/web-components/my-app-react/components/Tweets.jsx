const { useState, useEffect } = React

function Tweets(props){

  const [followersTweets, setFollowersTweets] = useState(undefined)

  useEffect(()=>{
      try{
        retrieveTweets(props.token, props.user,(error, followersTweets) => {
          if(error) throw error
          setFollowersTweets(followersTweets)
        })
      }catch(error) {props.setError(error.message)}
    }, [props.tweet]
  )

  const printTweets = () => {
    return followersTweets && followersTweets.map(({ username, message, date }) => (
      <li>{`${username} tweeted: ${message} ${date.toString().slice(0,10) + ' ' + date.toString().slice(11,16)}`}</li>));
  }

  return <>
    {props.tweet && <Tweet tweet={props.tweet} />}
    <h3>Feed</h3>
    <section className="tweets">
      <ul>{printTweets()}</ul>
    </section>
  </>
}