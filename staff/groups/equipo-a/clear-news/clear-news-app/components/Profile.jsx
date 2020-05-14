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

         const name= event.target.name.value
         const surname = event.target.surname.value
         const email = event.target.email.value
         const oldPassword = event.target.password.value
         const password = event.target.newPassword.value
        
         const country=event.target.country.value

        const userUpdate={name, surname, email, oldPassword, password, categories, country}

        try {
            changeProfile(token,userUpdate , error => {
                if (error) return setError(error.message)
                setSucces(message)
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
                <input type="text" name="name" placeholder="name" defaultValue={name} pattern="[A-Za-z]{1,20}" autoComplete="off" required/> 
                <input type="text" name="surname" placeholder="surname" defaultValue={surname} pattern="[A-Za-z]{1,20}"autoComplete="off"  required/>
                <input type="email" name="email" defaultValue={email} placeholder="e-mail" autoComplete="off" required/>
                <p>Fill it up, just if you want to change your password.</p>
                <input type="password" name="password" placeholder="password" minLength="8" autoComplete="off"/> 
                <input type="password" name="newPassword" placeholder="new password" minLength="8" />
                
                <label >Change your country:</label>
                <select className="register__country" defaultValue={country} name="country">
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
                <fieldset className="register__checkbox" >

                    <legend>Change your favorite topics</legend>

                    {categories.business ? <input type="checkbox" name="business" defaultChecked /> : <input type="checkbox" name="business"  />}
                    <label >Business</label>
                    {categories.entertainament ? <input type="checkbox" name="entertainment" defaultChecked /> : <input type="checkbox" name="entertainment"  />}
                    <label >Entertainment</label>
                    {categories.health ? <input type="checkbox" name="health" defaultChecked /> : <input type="checkbox" name="health"  />}
                    <label >Health</label>
                    {categories.science ? <input type="checkbox" name="science" defaultChecked /> : <input type="checkbox" name="science"  /> }
                    <label >Science</label>
                    {categories.sports ? <input type="checkbox" name="sports" defaultChecked /> : <input type="checkbox" name="sports"  />}
                    <label >Sports</label>
                    {categories.general ? <input type="checkbox" name="general" defaultChecked /> : <input type="checkbox" name="general"  />}
                    <label >General</label>
                    {categories.technology ? <input type="checkbox" name="technology" defaultChecked /> : <input type="checkbox" name="technology"  />}
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
