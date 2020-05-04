function createTweet (onSubmit) {
    return <section className="createTweet"> 
    <h2>Tweet Now</h2>
    <form onSubmit= {onSubmmit}>
        <input type="text" name="myTweet" placeholder=" Qué está pasando " />
        <button>Twittear</button>
    </form>
    </section>
}