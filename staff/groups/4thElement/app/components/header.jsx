function Header ({onGoToLogin}) {
    return <header className="Header">
    <section className="Header__container">
        <h2 className="Header__container--name">4thElement</h2>
        <a onClick={onGoToLogin} className="Header__container--login" href="">Logout</a>
    </section>
</header>

}