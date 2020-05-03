function Tweet({tweet}){

    const {message, text, date} = tweet
    message || (message = text) 
    return<>
        <section className = 'tweet'>
            <h3>Your latest Tweet </h3>
            <ul>
                <li>{`${message} ${date.toString().slice(4,21)}`}</li>
            </ul> 
        </section>
    </>
    
}