const { useState } = React

function Register({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {     
        event.preventDefault();
        
        let country=event.target.country.value
        let business =false;
        let entertainment = false;
        let general = false;
        let health = false;
        let science = false;
        let sports = false;
        let technology = false;
 
        if (event.target.business.checked) business = Boolean(event.target.business.value);
        if (event.target.entertainment.checked) entertainment = Boolean(event.target.entertainment.value);
        if (event.target.general.checked) general = Boolean(event.target.general.value);
        if (event.target.health.checked) health = Boolean(event.target.health.value);
        if (event.target.science.checked) science = Boolean(event.target.science.value);
        if (event.target.sports.checked) sports = Boolean(event.target.sports.value);
        if (event.target.technology.checked) technology = Boolean(event.target.technology.value);
        
        let interests = { business, entertainment, general, health, science, sports, technology }

        let { name, surname, email, password } = event.target;
       
        name = name.value;
        surname = surname.value;
        email = email.value;
        password = password.value;
       
        try {
            registerUser(name, surname, email, password, interests, country, error => {
                if (error) return setError(error.message);
                
                onRegister();
            })
        } catch ({ message }) {
            setError(message);
        }
    }

    const handleGoToLogin = event => {
        event.preventDefault();
        
        onGoToLogin();
    }

    return <section className="register">
    <img className="register__logo"
            src="images/logo.png"></img>
        <h1>Register</h1>
        <form className="register__input" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />

            <label >Choose your country:</label>
            <select className="register__country" name="country">
            <option value ="ar"> Argentina</option> 
                    <option value ="ca"> Canada</option> 
                    <option value ="ch"> China</option> 
                    <option value ="de"> Germany</option> 
                    <option value ="br"> Brazil</option> 
                    <option value ="gb"> Great Britain</option> 
                    <option value ="it"> Italy</option> 
                    <option value ="jp"> Japan</option> 
                    <option value ="nz"> New Zealand</option> 
                    <option value ="ph"> Phillipines</option> 
                    <option value ="pt"> Portugal</option> 
                    <option value ="ru"> Russia</option> 
                    <option value ="us"> United States of America</option>      
                  
            </select>
            <fieldset className="register__checkbox">
                <legend>Choose your favorite topics</legend>            
                <input type="checkbox" name="business" value="true" />Business<br/>
                <input type="checkbox" name="entertainment" value="true" />Entertainment<br/>
                <input type="checkbox" name="general" value="true" />General<br/>
                <input type="checkbox" name="health" value="true" />Health<br/>
                <input type="checkbox" name="science" value="true" />Science<br/>
                <input type="checkbox" name="sports" value="true" />Sports<br/>
                <input type="checkbox" name="technology" value="true" />Technology<br/>    
            </fieldset>
            <section className="resister__nav-button">
            <button className="register__button">Submit</button>
            <a href="" onClick={handleGoToLogin}>Login</a>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}