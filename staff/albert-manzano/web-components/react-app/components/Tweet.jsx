const {useState,Component} = React

function Tweet ({token}) {
    const [error,setError] = useState()
    const [success,setSuccess] = useState()    

    const handleSubmit= (event)=> {
        event.preventDefault()
        
        let message = event.target.tweet.value
        tweet(token , message, error => {
            if (error) setError( "error")
            else setSuccess ( "succes")
        })
    }
    
        return <section className="tweet">
            <form onSubmit={handleSubmit}>
                <input type="text" name="tweet" />
                <button>Twittear</button>
                {success && <Feedback message={success} level="undefined" />}
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
}