const { useState } = React

function Register({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {     
        event.preventDefault();
        
        let country=event.target.country.value
        let business
        let entertainment 
        let general 
        let health 
        let science 
        let sports 
        let technology 
 
        event.target.business.checked ? business = true : business=false
        event.target.entertainment.checked ? entertainment=true : entertainment=false
        event.target.general.checked ? general=true : general=false
        event.target.health.checked ? health=true : health=false
        event.target.science.checked ? science=true : science=false
        event.target.sports.checked ? sports=true : sports=false
        event.target.technology.checked ? technology=true : technology=false
        
        const categories = { business, entertainment, general, health, science, sports, technology }

        let { name, surname, email, password } = event.target;
       
        name = name.value;
        surname = surname.value;
        email = email.value;
        password = password.value;
       
        try {
            registerUser(name, surname, email, password, categories, country, error => {
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
                <input type="checkbox" name="business" />Business<br/>
                <input type="checkbox" name="entertainment" />Entertainment<br/>
                <input type="checkbox" name="general" />General<br/>
                <input type="checkbox" name="health" />Health<br/>
                <input type="checkbox" name="science" />Science<br/>
                <input type="checkbox" name="sports" />Sports<br/>
                <input type="checkbox" name="technology" />Technology<br/>    
            </fieldset>
            <section className="resister__nav-button">
            <button className="register__button">Submit</button>
            <a href="" onClick={handleGoToLogin}>Login</a>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}