function CreateTweet({onSubmit}){
    
    return  <section className="tweet">
    <form onSubmit={onSubmit}>
        <input placeholder="tweet" name="tweet" required />
        <button type='submit'>Tweet</button>
    </form>
</section>
}