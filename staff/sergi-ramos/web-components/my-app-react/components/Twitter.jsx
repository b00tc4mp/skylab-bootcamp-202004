const { useState } = React
function Twitter(props) {
  
   function handleOnTweet(tweet) {

        writeTweet(tweet, props.token, (error) => {
            if (error) return console.log(error) //TODO
            props.retrieveTweets()
        })
    }
  
        return <section className="twitter">
            <h2>Twitter</h2>
            <Tweet onSubmitTweet={handleOnTweet} />
            {props.resultsTweet && <Tweets listTweet={props.resultsTweet} />}
        </section>
}