import React, {useState, useEffect} from 'react'
import './Home.sass'
import searchIcon from './images/search.svg'
import wave from './images/wave.svg'
import RegisterWorker from './RegisterWorker'
import mail from './images/mail.svg'
import insta from './images/insta.svg'
import twitter from './images/twitter.svg'
import contact from './images/contact-us.svg'

export default function Home({token, userName, onGoToLogin, onRegister, onSearcher}) {

    const [error, setError] = useState('')
    const [workerAccount, setWorkerAccount] = useState('')

    const handelOnWorker = () => {
        if(!workerAccount)  setWorkerAccount(true)
        else setWorkerAccount('')
       
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        let {searcher} = event.target
        searcher = searcher.value

        onSearcher(searcher)
    }

    const handelSearch = (value) => {
        onSearcher(value)
    }

    return <section className="home">
            <div className="home__headerConatiner">
                {!userName &&
                    <div className="home__header" >
                        <h1 className="home__name">TakeMyTask</h1>
                        <div className="home__login" onClick={onGoToLogin}>
                            <h2>Login</h2>
                        </div>
                    </div>
                }
                {userName &&
                    <div className="home__header" >
                        <h1 className="home__name">Hi, {userName}!</h1>
                        <div className="home__foto">
                            <h2>foto</h2>
                        </div>
                    </div>
                }
            </div>
            <div className="home__body">

                <form className="home__search">
                    <div className="home__serachContainer">
                        <form onSubmit={handleSearchSubmit}>
                            <button>
                                <img src={searchIcon}></img>
                            </button>
                            <input type="text" name="searcher" placeholder="What you need..."></input>
                        </form>
                    </div>
                </form>

                <div className="home__grid">
                    <div onClick={ () => handelSearch('Carpentry')}>
                        <h3>Carpentry</h3>
                    </div>
                    <div onClick={ () => handelSearch('Electrician')}>
                        <h3>Electrician</h3>
                    </div>
                    <div onClick={ () => handelSearch('Gardening')}>
                        <h3>Gardening</h3>
                    </div>
                    <div onClick={ () => handelSearch('Cleaning')}>
                        <h3>Cleaning</h3>
                    </div>
                </div>

                <div className="home__worker">
                    <img src={wave}></img>
                    <div className="home__registerWorker">
                        <h1>Work with us!</h1>
                        <p>You have the skills needed to work with us? <br/> Creat your working account and start working with us</p>
                        {!workerAccount && <div className="home__openWorker" onClick={handelOnWorker}>

                            <h2>Creat a worker account</h2>
                        </div>}

                        {workerAccount && <RegisterWorker onRegister={onRegister}/>}
                    </div>
                </div>

                <div className="home__social">
                    <div className="home__socialTop">
                        <img src={twitter}></img>
                        <img src={insta}></img>
                    </div>
                    <div className="home__socialBotom">
                        <img src={mail}></img>
                        <img src={contact}></img>
                    </div>
                </div>

            </div>

           
        </section>
}