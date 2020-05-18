const { useState, Component } = React

function Google() {

    const [googleFind, setgoogleFind] = useState(undefined)

    const handleGoogle = (query) => {
        googleSearch(query, (error, results) => {
            debugger
            setgoogleFind(results)
        })
    }

    return <section className="google">
        <h2>Google</h2>
        <Search onSubmit={handleGoogle} />
        {googleFind && <GoogleResults googleFind={googleFind} />}
    </section >
}