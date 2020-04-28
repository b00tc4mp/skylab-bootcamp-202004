function Landing({ onLogin,onRegister }) {
    return <section className="landing">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/30/gc/designs/livepreview/amazon_squidink_noto_email_v2016_es-main._CB462075794_.png" className="logo"></img>
        <a href="" onClick={ event => {
            event.preventDefault();

            onRegister();
        }}>Register</a> or <a href="" onClick={ event => {
            event.preventDefault();

            onLogin();
        }}>Login</a>
    </section>
}