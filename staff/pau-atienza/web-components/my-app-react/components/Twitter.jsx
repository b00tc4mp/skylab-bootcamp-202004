function Twitter({handleTweet, email}){


    return <>
        <section className="tweet">
            <form onSubmit = {handleTweet}>
            <input type="text" name="tweet"/>
                <button>Tweet</button>
            </form>
        </section>
        <Tweets email = {email}/>
        </>
        

}