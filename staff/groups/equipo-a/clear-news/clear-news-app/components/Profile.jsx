const { useState,useEffect } = React

function Profile({ onChangeProf,token}) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        let country
        let business =false
        let entertainment = false
        let general = false
        let health = false
        let science = false
        let sports = false
        let technology = false

        
        if (event.target.business.checked) business = Boolean(event.target.business.value)
        if (event.target.entertainment.checked) entertainment = Boolean(event.target.entertainment.value)
        if (event.target.general.checked) general = Boolean(event.target.general.value)
        if (event.target.health.checked) health = Boolean(event.target.health.value)
        if (event.target.science.checked) science = Boolean(event.target.science.value)
        if (event.target.sports.checked) sports = Boolean(event.target.sports.value)
        if (event.target.technology.checked) technology = Boolean(event.target.technology.value)

        let interests = { business, entertainment, general, health, science, sports, technology }

        let { name, surname, email, password,oldPassword } = event.target
        debugger
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        oldPassword= oldPassword.value

        switch (event.target.country.value) {
            case 'Arab Emirates':
                country = "ea"
                break;
            case 'Argentina':
                country = "ar"
                break;
            case 'Austria':
                country = "at"
                break;
            case 'Australia':
                country = "au"
                break;
            case 'Belgica':
                country = "be"
                break;
            case 'Bulgaria':
                country = "bg"
                break;
            case 'Brasil':
                country = "br"
                break;
            case 'Canada':
                country = "ca"
                break;
            case 'Switzerland':
                country = "ch"
                break;
            case 'China':
                country = "cn"
                break;
            case 'Colombia':
                country = "co"
                break;
            case 'Cuba':
                country = "cu"
                break;
            case 'Czch Republica':
                country = "cz"
                break;
            case 'Germany':
                country = "de"
                break;
            case 'France':
                country = "fr"
                break;
            case 'Great Britain':
                country = "gb"
                break;
            case 'Greece':
                country = "gr"
                break;
            case 'Hong Kong':
                country = "hk"
                break;
            case 'Hungary':
                country = "hu"
                break;
            case 'Irlanda':
                country = "ie"
                break;
            case 'Israel':
                country = "il"
                break;
            case 'Italy':
                country = "it"
                break;
            case 'Japan':
                country = "jp"
                break;
            case 'Lituania':
                country = "lt"
                break;
            case 'Letonia':
                country = "lv"
                break;
            case 'Marocco':
                country = "ma"
                break;
            case 'Mexico':
                country = "mx"
                break;
            case 'Malasia':
                country = "my"
                break;
            case 'Nigeria':
                country = "ng"
                break;
            case 'Netherlands':
                country = "nl"
                break;
            case 'Norway':
                country = "no"
                break;
            case 'New Zealand':
                country = "nz"
                break;
            case 'Phillipines':
                country = "ph"
                break;
            case 'Polonia':
                country = "pl"
                break;
            case 'Portugal':
                country = "pt"
                break;
            case 'Rumania':
                country = "ro"
                break;
            case 'Serbia':
                country = "rs"
                break;
            case 'Russia':
                country = "ru"
                break;
            case 'Saudi Arabia':
                country = "sa"
                break;
            case 'Sweden':
                country = "se"
                break;
            case 'Singapur':
                country = "sg"
                break;
            case 'Eslovenia':
                country = "si"
                break;
            case 'Thailand':
                country = "th"
                break;
            case 'Turkey':
                country = "tr"
                break;
            case 'Taiwan':
                country = "tw"
                break;
            case 'Ucrania':
                country = "ua"
                break;
            case 'United States of America':
                country = "us"
                break;
            case 'Venezuela':
                country = "ve"
                break;
            case 'South Africa':
                country = "za"
                break;
            case 'Default':
                country = null
                break;
            default:
                throw error
        }
        try {
            profileChange(token, name, surname, email, password,oldPassword, interests, country, error => {
                if (error) return setError(error.message)

                onChangeProf()//aqui meter los valores que queremos pasar a home
            })
        } catch ({ message }) {
            setError(message)
        }
    }


    return <section className="register">
        <h1>Change profile</h1>
        <form className="register__input" autoComplete ="off" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail"  required />
            <input type="password" name="password" placeholder="password"   required minLength="8" />
            <input type="password" name="oldPassword" placeholder="Old password" required minLength="8" />

            <label >Change your country:</label>
            <select className="register__country" name="country">
                    <option>Default</option>
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
            <fieldset className="register__checkbox" required>
                <legend>Change your favorite topics</legend>
                <input type="checkbox" name="business" value="true" />Business<br/>
                <input type="checkbox" name="entertainment" value="true" />Entertainment<br/>
                <input type="checkbox" name="general" value="true" />General<br/>
                <input type="checkbox" name="health" value="true" />Health<br/>
                <input type="checkbox" name="science" value="true" />Science<br/>
                <input type="checkbox" name="sports" value="true" />Sports<br/>
                <input type="checkbox" name="technology" value="true" />Technology<br/>
            </fieldset>
            <section className="resister__nav-button">
            <button className="register__button" >Apply</button>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}