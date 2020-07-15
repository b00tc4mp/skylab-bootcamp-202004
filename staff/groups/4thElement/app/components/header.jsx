function Header ({token, view ,forecastSelected, OnLogout, sportState}) {

    const handleLogOut=()=>{
        OnLogout()
    }

    return <header className="Header">
    <section className={`Header__container Header__container--${sportState}`}>
        <h2 className="Header__container--name">{forecastSelected.name && (view==='surfForecast' || view==='snowForecast')? `${forecastSelected.name}`:`4thElement`}</h2>
        <h2 onClick={handleLogOut} className="Header__container--login" href="">{token? `Logout`: `Login`}</h2>
    </section>
</header>

}