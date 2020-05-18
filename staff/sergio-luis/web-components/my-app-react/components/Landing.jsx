function Landing({onClick}){
    return <section className='landing'>
    <a href="" className="landing__a" onClick={event =>{
        event.preventDefault();
        onClick('register');
    }}>Register</a>
    <p className="landing__or">or</p>
    <a href="" className="landing__a" onClick={event =>{
        event.preventDefault();
        onClick('login')}}>Login</a>
</section>
}