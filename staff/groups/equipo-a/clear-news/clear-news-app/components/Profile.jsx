const { useState, useEffect } = React

function Profile({ token, categories, country }) {
    const [error, setError] = useState()
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    // const [categories , setCategories] = useState()
    // const [country, setCountry] = useState()
    //todo a traves de estado setear variables

    useEffect(() => {
        retrieveUser(token, (error, user) => {
            if (error) setError(error.message)

            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)


            // setCategories(user.categories)
            // setCountry(user.country)
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

        let { name, surname, email, password, oldPassword } = event.target
        debugger
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        oldPassword = oldPassword.value

        try {
            profileChange(token, name, surname, email, password, oldPassword, interests, country, error => {
                if (error) return setError(error.message)

                onChangeProf()//aqui meter los valores que queremos pasar a home
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className="register">
        <section><h1>Change profile</h1>

            <form className="register__input" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="name" value={`${name}`} pattern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="username" value={`${surname}`} pattern="[A-Za-z]{1,20}" />
                <input type="email" name="email" value={`${email}`} placeholder="e-mail" />
                <input type="password" name="password" placeholder="password" minLength="8" />
                <input type="password" name="oldPassword" placeholder="Old password" required minLength="8" />

                <label >Change your country:</label>
                <select className="register__country" name="country">

                    {/* {country === '' ? <option>International News</option> */}

                    {country === 'ar' ? <option selected >Argentina</option> : <option>Argentina</option>}
                    {country === 'br' ? <option selected >Brazil</option> : <option>Brazil</option>}
                    {country === 'ca' ? <option selected >Canada</option> : <option>Canada</option>}
                    {country === 'ch' ? <option selected >China</option> : <option>China</option>}
                    {country === 'de' ? <option selected>Germany</option> : <option>Germany</option>}
                    {country === 'gb' ? <option selected>Great Britain</option> : <option>Great Britain</option>}
                    {country === 'it' ? <option selected>Italy</option> : <option>Italy</option>}
                    {country === 'jp' ? <option selected>Japan</option> : <option>Japan</option>}
                    {country === 'nz' ? <option selected >New Zealand</option> : <option>New Zealand</option>}
                    {country === 'ph' ? <option selected >Phillipines</option> : <option>Phillipines</option>}
                    {country === 'pt' ? <option selected >Portugal</option> : <option>Portugal</option>}
                    {country === 'ru' ? <option selected >Russia</option> : <option>Russia</option>}
                    {country === 'us' ? <option selected >United States of America</option> : <option>Portugal</option>}

                </select>
                <fieldset className="register__checkbox" >
                    <legend>Change your favorite topics</legend>


                    {categories.business ? <input type="checkbox" name="business" value="business"  checked /> : <input type="checkbox" name="business" value="business" />}
                    <label for="business">Business</label>
                    {categories.entertainament ? <input type="checkbox" name="entertainament" value="entertainament" checked /> : <input type="checkbox" name="entertainament" value="entertainament" />}
                    <label for="entertainament">Entertainament</label>
                    {categories.health ? <input type="checkbox" name="health" value="health" checked /> : <input type="checkbox" name="health" value="health" />}
                    <label for="health">Health</label>
                    {categories.science ? <input type="checkbox" name="science" value="science"  checked /> : <input type="checkbox" name="science" value="science" /> }
                    <label for="science">Science</label>
                    {categories.sports ? <input type="checkbox" name="sports" value="sports" checked /> : <input type="checkbox" name="sports" value="sports" />}
                    <label for="sports">Sports</label>
                    {categories.general ? <input type="checkbox" name="general" value="general" checked /> : <input type="checkbox" name="general" value="general" />}
                    <label for="general">General</label>
                    {categories.technology ? <input type="checkbox" name="technology" value="technology" checked /> : <input type="checkbox" name="technology" value="technology" />}
                    <label for="technology">Technology</label>
                    {/* <input type="checkbox" name="entertainment" value="Entertainment" checked={ `${categories.entertainment ? true : }`}/>Entertainment
                    <input type="checkbox" name="general" value="General" checked={ `${categories.general ? true : }`}/> General
                    <input type="checkbox" name="health" value="Health" checked={ `${categories.health ? true : }`}/> Health
                    <input type="checkbox" name="science" value="Science" checked={ `${categories.science ? true : }`}/> Science
                    <input type="checkbox" name="sports" value="Sports" checked={ `${categories.sport ? true : }`}/> Sports
                    <input type="checkbox" name="technology" value="Technology" checked={ `${categories.technology ? true : }`}/>Technology  */}


                </fieldset>
                <section className="resister__nav-button">
                    <button className="register__button" >Apply</button>
                </section>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>

    </section>

}
