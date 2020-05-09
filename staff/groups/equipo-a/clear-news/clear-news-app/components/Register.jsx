const { useState } = React

function Register({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        let region
        let business = false
        let entertainment = false
        let general = false
        let health = false
        let science = false
        let sports = false
        let technology = false

        let interests = { business, entertainment, general, health, science, sports, technology }

        if (event.target.business.checked) business = Boolean(event.target.business.value)
        if (event.target.entertainment.checked) entertainment = Boolean(event.target.entertainment.value)
        if (event.target.general.checked) general = Boolean(event.target.general.value)
        if (event.target.health.checked) health = Boolean(event.target.health.value)
        if (event.target.science.checked) science = Boolean(event.target.science.value)
        if (event.target.sports.checked) sports = Boolean(event.target.sports.value)
        if (event.target.technology.checked) technology = Boolean(event.target.technology.value)


        let { name, surname, email, password, regions } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        switch (event.target.regions.value) {
            case 'Arab Emirates':
                region = "ea"
                break;
            case 'Argentina':
                region = "ar"
                break;
            case 'Austria':
                region = "at"
                break;
            case 'Australia':
                region = "au"
                break;
            case 'Belgica':
                region = "be"
                break;
            case 'Bulgaria':
                region = "bg"
                break;
            case 'Brasil':
                region = "br"
                break;
            case 'Canada':
                region = "ca"
                break;
            case 'Switzerland':
                region = "ch"
                break;
            case 'China':
                region = "cn"
                break;
            case 'Colombia':
                region = "co"
                break;
            case 'Cuba':
                region = "cu"
                break;
            case 'Czch Republica':
                region = "cz"
                break;
            case 'Germany':
                region = "de"
                break;
            case 'France':
                region = "fr"
                break;
            case 'Great Britain':
                region = "gb"
                break;
            case 'Greece':
                region = "gr"
                break;
            case 'Hong Kong':
                region = "hk"
                break;
            case 'Hungary':
                region = "hu"
                break;
            case 'Irlanda':
                region = "ie"
                break;
            case 'Israel':
                region = "il"
                break;
            case 'Italy':
                region = "it"
                break;
            case 'Japan':
                region = "jp"
                break;
            case 'Lituania':
                region = "lt"
                break;
            case 'Letonia':
                region = "lv"
                break;
            case 'Marocco':
                region = "ma"
                break;
            case 'Mexico':
                region = "mx"
                break;
            case 'Malasia':
                region = "my"
                break;
            case 'Nigeria':
                region = "ng"
                break;
            case 'Netherlands':
                region = "nl"
                break;
            case 'Norway':
                region = "no"
                break;
            case 'New Zealand':
                region = "nz"
                break;
            case 'Phillipines':
                region = "ph"
                break;
            case 'Polonia':
                region = "pl"
                break;
            case 'Portugal':
                region = "pt"
                break;
            case 'Rumania':
                region = "ro"
                break;
            case 'Serbia':
                region = "rs"
                break;
            case 'Russia':
                region = "ru"
                break;
            case 'Saudi Arabia':
                region = "sa"
                break;
            case 'Sweden':
                region = "se"
                break;
            case 'Singapur':
                region = "sg"
                break;
            case 'Eslovenia':
                region = "si"
                break;
            case 'Thailand':
                region = "th"
                break;
            case 'Turkey':
                region = "tr"
                break;
            case 'Taiwan':
                region = "tw"
                break;
            case 'Ucrania':
                region = "ua"
                break;
            case 'United States of America':
                region = "us"
                break;
            case 'Venezuela':
                region = "ve"
                break;
            case 'South Africa':
                region = "za"
                break;
            default:
                throw error
        }
        try {
            registerUser(name, surname, email, password, interests, region, error => {
                if (error) return setError(error.message)

                onRegister()
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToLogin = event => {
        event.preventDefault()

        onGoToLogin()
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
            <p>Choose your country</p>
            <select class="register__country" name="country">
                    <option>Arab Emirates</option> 
                    <option>Argentina</option> 
                    <option>Austria</option>  
                    <option>Australia</option> 
                    <option>Belgica</option>
                    <option>Bulgaria</option>
                    <option>Brasil</option>
                    <option>Canada</option>
                    <option>Switzerland</option>
                    <option>China</option>
                    <option>Colombia</option>
                    <option>Cuba</option>
                    <option>Czch Republica</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Great Britain</option>
                    <option>Greece</option>
                    <option>Hong Kong</option>
                    <option>Hungary</option>
                    <option>Irlanda</option>
                    <option>Israel</option>
                    <option>Italy</option>
                    <option>Japan</option>
                    <option>Lituania</option>
                    <option>Letonia</option>
                    <option>Marocco</option>
                    <option>Mexico</option>
                    <option>Malasia</option>
                    <option>Nigeria</option>
                    <option>Netherlands</option>
                    <option>Norway</option>
                    <option>New Zealand</option>
                    <option>Phillipines</option>
                    <option>Polonia</option>
                    <option>Portugal</option>
                    <option>Rumania</option>
                    <option>Serbia</option>
                    <option>Russia</option>
                    <option>Saudi Arabia</option>
                    <option>Sweden</option>
                    <option>Singapur</option>
                    <option>Eslovenia</option>
                    <option>Thailand</option>
                    <option>Turkey</option>
                    <option>Taiwan</option>
                    <option>Ucrania</option>
                    <option>United States of America</option>
                    <option>Venezuela</option>
                    <option>South Africa</option>
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
            <button class="register__button" >Submit</button>
                or <a href="" onClick={handleGoToLogin}>Login</a>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}