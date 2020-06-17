import React, {useState, useEffect} from 'react'
import './style/home.sass'
import Feedback from './Feedback'
import searchIcon from './style/images/search.svg'

export default function Home({token, userName}) {

    const [error, setError] = useState('')

    return <section className="home">

            {!token &&
                <div className="home__header" >
                    <h1 className="home__name">TakeMyTask</h1>
                    <div className="home__login">
                        <h2>Login</h2>
                    </div>
                </div>
            }
            {token &&
                <div className="home__header" >
                    <h1 className="home__name">Hi, {userName}!</h1>
                    <div className="home__foto">
                        <h2>foto</h2>
                    </div>
                </div>
            }
            <div className="home__body">
                <form className="home__search">
                    <div className="home__serachContainer">
                        <img src={searchIcon}></img>
                        <input type="text" name="searcher" placeholder="What you need..."></input>
                    </div>
                </form>
            </div>

           
        </section>
}