function Google({googleResults, googleError, handleGoogleSearch, query}) {
    return <section className="google">
        <h2>Google</h2>
        <Search onSubmit={handleGoogleSearch} query={query} />
        {googleError && <Feedback message={googleError} level={'error'} />} 
        {googleResults && <GoogleResults results={googleResults} />}
    </section>    
}