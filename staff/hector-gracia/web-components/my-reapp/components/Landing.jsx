const { Component } = React;

function Landing({onResgister, onLogin}){
    return <section className="landing">
    <h1 className="landing__title">Welcome to PETER 🦗</h1>
    <div className="landing__user-management">
        <a href="" className="peter__link" onClick={event=> {event.preventDefault(); onResgister()} } >Start using Peter</a>
        <p>or</p>
        <a href="" className="peter__link"  onClick={event=> {event.preventDefault(); onLogin()} }>I already have an acount</a>
    </div>
    </section>
}
    