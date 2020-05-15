const { useState, Component } = React

function Ecosia() {

    const [ecosia, setEcosia] = useState(undefined)

    const handleOnEcosia = (query) => {
        ecosiaSearch(query, (error, results) => {
            debugger
            setEcosia(results)
        })
    }

    return <section className="ecosia">
        <h2>Ecosia</h2>
        <Search onSubmit={handleOnEcosia} />
        {ecosia && <EcosiaResults results={ecosia} />}
    </section >
}
