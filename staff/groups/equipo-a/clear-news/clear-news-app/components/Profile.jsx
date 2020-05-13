const { useState, useEffect } = React

function Profile({ token, categories, country }) {
    const [error, setError] = useState()
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [success,setSucces] = useState()

    useEffect(() => {
        retrieveUser(token, (error, user) => {
            if (error) setError(error.message)

            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
        })

    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        let business = false
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

        let { name, surname, email, password, newPassword } = event.target
     
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        newPassword = newPassword.value

        switch (event.target.country.value) {
            case 'Argentina':
                country = "ar"
                break;
            case 'Brasil':
                country = "br"
                break;
            case 'Canada':
                country = "ca"
                break;
            case 'China':
                country = "cn"
                break;
            case 'Germany':
                country = "de"
                break; 
            case 'Great Britain':
                country = "gb"
                break;
            case 'Italy':
                country = "it"
                break;
            case 'Japan':
                country = "jp"
                break;
            case 'New Zealand':
                country = "nz"
                break;
            case 'Phillipines':
                country = "ph"
                break;
            case 'Portugal':
                country = "pt"
                break;
            case 'Russia':
                country = "ru"
                break;
            case 'United States of America':
                country = "us"
                break;
            default:
                throw error
        }

        let userUpdate={name, surname, email, password, newPassword, interests, country}

        try {
            profileChange(token,userUpdate , error => {
                if (error) return setError(error.message)
                setSucces(success)
                // onChangeProf()//aqui meter los valores que queremos pasar a home
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className="register">

        <section><h1>Change profile</h1>

            <form className="register__input" onSubmit={handleSubmit}>
                <p>Please refill the fields you wish to change:</p>
                <input type="text" name="name" placeholder="name" value={`${name}`} pattern="[A-Za-z]{1,20}" required/>
                <input type="text" name="surname" placeholder="username" value={`${surname}`} pattern="[A-Za-z]{1,20}" required/>
                <input type="email" name="email" value={`${email}`} placeholder="e-mail" required/>
                <input type="password" name="password" placeholder="password" minLength="8" required/> 
                <p>Fill it up, just if you want to change your password.</p>
                <input type="password" name="newPassword" placeholder="new password" minLength="8" />
                
                <label >Change your country:</label>
                <select className="register__country" name="country">

                    {country === 'ar' ? <option selected >Argentina</option> : <option>Argentina</option>}
                    {country === 'br' ? <option selected >Brazil</option> : <option>Brazil</option>}
                    {country === 'ca' ? <option selected >Canada</option> : <option>Canada</option>}
                    {country === 'ch' ? <option selected >China</option> : <option>China</option>}
                    {country === 'de' ? <option selected >Germany</option> : <option>Germany</option>}
                    {country === 'gb' ? <option selected >Great Britain</option> : <option>Great Britain</option>}
                    {country === 'it' ? <option selected >Italy</option> : <option>Italy</option>}
                    {country === 'jp' ? <option selected >Japan</option> : <option>Japan</option>}
                    {country === 'nz' ? <option selected >New Zealand</option> : <option>New Zealand</option>}
                    {country === 'ph' ? <option selected >Phillipines</option> : <option>Phillipines</option>}
                    {country === 'pt' ? <option selected >Portugal</option> : <option>Portugal</option>}
                    {country === 'ru' ? <option selected >Russia</option> : <option>Russia</option>}
                    {country === 'us' ? <option selected >United States of America</option> : <option>Portugal</option>}

                </select>
                <fieldset className="register__checkbox" >

                    <legend>Change your favorite topics</legend>

                    {categories.business ? <input type="checkbox" name="business" value="true"  defaultChecked /> : <input type="checkbox" name="business" value="true" />}
                    <label >Business</label>
                    {categories.entertainament ? <input type="checkbox" name="entertainament" value="true" defaultChecked /> : <input type="checkbox" name="entertainament" value="true" />}
                    <label >Entertainament</label>
                    {categories.health ? <input type="checkbox" name="health" value="true" defaultChecked /> : <input type="checkbox" name="health" value="true" />}
                    <label >Health</label>
                    {categories.science ? <input type="checkbox" name="science" value="true"  defaultChecked /> : <input type="checkbox" name="science" value="true" /> }
                    <label >Science</label>
                    {categories.sports ? <input type="checkbox" name="sports" value="true" defaultChecked /> : <input type="checkbox" name="sports" value="true" />}
                    <label >Sports</label>
                    {categories.general ? <input type="checkbox" name="general" value="true" defaultChecked /> : <input type="checkbox" name="general" value="true" />}
                    <label >General</label>
                    {categories.technology ? <input type="checkbox" name="technology" value="true" defaultChecked /> : <input type="checkbox" name="technology" value="true" />}
                    <label >Technology</label>

                </fieldset>
                <section className="resister__nav-button">
                    <button className="register__button" >Apply</button>
                </section>
                {
                error && <Feedback message={error} level="error" />
                }
                {
                success && <Feedback message={"success"} />
                }
                
            </form>
        </section>

    </section>

}
