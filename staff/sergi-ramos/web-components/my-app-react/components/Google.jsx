const { Component } = React

function Google(props) {

    const [googleFind, setGoogleFind] = useState(undefined)

    function handleGoogle(query) {

        searchGoogle(query, (error, results) => {
            setGoogleFind(results)
        })
    }

    return <section className="google">
        <h2>Google</h2>
        <Search onSubmit={handleGoogle} />
        {googleFind && <GoogleResults googleFind={googleFind} />}
    </section >


}