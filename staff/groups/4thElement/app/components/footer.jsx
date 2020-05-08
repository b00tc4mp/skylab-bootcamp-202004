function Footer ({GoToSearch, GoToHome}) {

    const handleGoToSearch= () => {
        GoToSearch()
    }

    const handleGoToHome = () => {
        GoToHome()
    }

    return <footer className="Footer">
    <section className="Footer__container">
        <i onClick={handleGoToHome} className="fas fa-home fa-2x"></i>
        <i onClick={handleGoToSearch} className="fas fa-search fa-2x"></i>
        <i className="fas fa-map-marked-alt fa-2x"></i>
        <i className="fas fa-star fa-2x"></i>
    </section>
</footer>

}