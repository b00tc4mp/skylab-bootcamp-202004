function Landing(props){

    return <>
        <section className = 'landing'>
            <form onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                <input type="text" name="query"/>
                <button>Card Search</button>
            </form>

            <a href="" onClick = {() => {event.preventDefault();props.setView('adv')}}>Advanced Search</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('account')}}>Your Account</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('registe')}}>Register</a> 
            <a href="" onClick = {() => {event.preventDefault();props.setView('login')}}>Login</a>
        </section>
    </>
}