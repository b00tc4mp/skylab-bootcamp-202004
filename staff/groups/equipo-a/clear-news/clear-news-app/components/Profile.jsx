const { useState, useEffect } = React

function Profile({ onChangeProf, token }) {
    const [error, setError] = useState()
    const [user , setUser] = useState()
    //todo a traves de estado setear variables

    useEffect(() => {
        retrieveUser(token, (error,  { name, surname, username, categories, country}) => {
            if (error) setError(error.message)
            let user={name, surname, username, categories, country}
            setUser(user)
            // const form=document.getElementsByClassName('register__input')
            // form[0].innerText= name
            // // form[1].innerText= surname
            // country=turnToCountry(country)
            // document.getElementsByClassName('register__country')[0].options[country].selected=true
            // const checkbox=document.querySelectorAll('input[type=checkbox]')
            // let result = Object.keys(categories).map(function (key) { return  categories[key] })
            //    for(let i=0; i<result.length; i++){
            //        if(result){
            //            let j=i
            //         for(j=0;j<checkbox.length;j++){
                        
            //             checkbox[j].checked=true
            //         }
            //     }
            //    }
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

        // let country=turnToIata(event.target.country.value)
        // switch (event.target.country.value) {
        //     case 'International News':
        //         country = ""
        //         break;
        //     case 'Argentina':
        //         country = "ar"
        //         break;
        //     case 'Austria':
        //         country = "at"
        //         break;
        //     case 'Australia':
        //         country = "au"
        //         break;
        //     case 'Brasil':
        //         country = "br"
        //         break;
        //     case 'Canada':
        //         country = "ca"
        //         break;
        //     case 'China':
        //         country = "cn"
        //         break;
        //     case 'Germany':
        //         country = "de"
        //         break;
        //     case 'France':
        //         country = "fr"
        //         break;
        //     case 'Great Britain':
        //         country = "gb"
        //         break;
        //     case 'Hong Kong':
        //         country = "hk"
        //         break;
        //     case 'Irlanda':
        //         country = "ie"
        //         break;
        //     case 'Italy':
        //         country = "it"
        //         break;
        //     case 'Japan':
        //         country = "jp"
        //         break;
        //     case 'Marocco':
        //         country = "ma"
        //         break;
        //     case 'Mexico':
        //         country = "mx"
        //         break;
        //     case 'New Zealand':
        //         country = "nz"
        //         break;
        //     case 'Phillipines':
        //         country = "ph"
        //         break;
        //     case 'Portugal':
        //         country = "pt"
        //         break;
        //     case 'Russia':
        //         country = "ru"
        //         break;
        //     case 'United States of America':
        //         country = "us"
        //         break;
        //     default:
        //         throw error
        
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
        <h1>Change profile</h1>
        <form className="register__input" onSubmit={handleSubmit}>
            <input innerText={user.name} type="text" name="name" placeholder= "name" pattern="[A-Za-z]{1,20}" />
            <input innerText={user.surname} type="text" name="surname" placeholder="username" pattern="[A-Za-z]{1,20}" />
            <input innerText={user.username} type="email" name="email" placeholder="e-mail"  />
            <input type="password" name="password" placeholder="password"  minLength="8" />
            <input type="password" name="oldPassword" placeholder="Old password" required minLength="8" />

            <label >Change your country:</label>
            <select className="register__country" name="country">
                {/* { (turnToCountry(user.country) */}
                <option>International News</option>
                <option>Argentina</option>
                <option>Austria</option>
                <option>Australia</option>
                <option>Brasil</option>
                <option>Canada</option>
                <option>China</option>
                <option>Germany</option>
                <option>France</option>
                <option>Great Britain</option>
                <option>Hong Kong</option>
                <option>Irlanda</option>
                <option>Italy</option>
                <option>Japan</option>
                <option>Marocco</option>
                <option>Mexico</option>
                <option>New Zealand</option>
                <option>Phillipines</option>
                <option>Portugal</option>
                <option>Russia</option>
                <option>United States of America</option>
                
            </select>
            {
                <fieldset className="register__checkbox" required>
                    <legend>Change your favorite topics</legend>
                    {user.categories({business,entertainment,general,health,science,sports,technology}
                    <input type="checkbox" name="business" innerText="Business" value={business.value} checked={business.value} /> <br />
                    <input type="checkbox" name="entertainment" innerText="Entertainment"value={entertainment.value} checked={entertainment.value}/> <br />
                    <input type="checkbox" name="general" innerText="General" value={general.value} checked={general.value} /> <br />
                    <input type="checkbox" name="health" innerText="Health" value={health.value} value={health.value} /><br />
                    <input type="checkbox" name="science" innerText="Science" value={science.value} /> <br />
                    <input type="checkbox" name="sports" innertText="Sports" value={sports.value} checked={sports.value} /><br />
                    <input type="checkbox" name="technology" innertText="Technology" value={technology.value} checked={technology.value} value="true" /> <br />
                    )}
            
                </fieldset>
            }
            <section className="resister__nav-button">
                <button className="register__button" >Apply</button>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}

{
    results && <ul className="news__container">
        {results.map(({ name, title, url, urlToImage, favorites }) =>
            <li className="news__item" key={title}>
                <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                    <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p></div></a>

                    <div className="news__button"> <input type="image" src={favorites? "images/heart-unfollow.png" : "images/heart-follow.png"} onClick={() => handleLikeNews(title)} /></div>



            </li>)}
    </ul>
}
