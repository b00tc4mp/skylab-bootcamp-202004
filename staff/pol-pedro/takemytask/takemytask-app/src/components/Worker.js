import React, {useState, useEffect} from 'react'
import './Worker.sass'
import Feedback from './Feedback'
import SerachResults from './SearchResults'
import {retriveUser, addComent, creatChat, addRate} from 'takemytask-client-logic'
import back from './images/back.svg'
import yellowStar from './images/star.svg'
import blackStar from './images/starblack.svg'
import pin from './images/pin.svg'


export default function Register({workerId, onSearcher, OnChat}) {
    const [searchId, setSearchId] = useState(workerId)
    const [error, setError] = useState('')
    const [results, setResults] = useState('')
    const [refresh, setRefresh] = useState('')
    const [rate, setRate] = useState('')

    useEffect ( () => {
        setRefresh(false)
        if(searchId){
            try {
                retriveUser(searchId)
                    .then( body => setResults(body)) 
                    .catch(error => setError(error.message))
            }catch({message}){
                setError(message)
            }
        }
      }, [refresh])

    const handelRatings = (ratings) =>{
        let cont = 0
        let total = 0

        for(var i in ratings){
            cont ++
            total += ratings[i].stars
        }
        
        if(total === 0 && cont === 0) return 0

        return total / cont
    }

    const handelStars = (rating) => {
        if( rating < 1){
            return <div className="profile__stars">
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
            </div>
        }
        if(rating < 2){

            return <div className="profile__stars">
                <img src={yellowStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
            </div>
        }
        if(rating < 3){
            return <div className="profile__stars">
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
            </div>
        }
        if(rating < 4){

            return <div className="profile__stars">
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={blackStar}></img>
                <img src={blackStar}></img>
            </div>
        }
        if(rating < 5){
            return <div className="profile__stars">
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={blackStar}></img>
            </div>
        }
        if(rating = 5){
            return <div className="profile__stars">
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
                <img src={yellowStar}></img>
            </div>
        }

    }

    const handelAddComent = (event) =>{
        event.preventDefault()
        let {coment} = event.target
        coment = coment.value
        try {
            addComent(searchId, coment)
                .then( () => setRefresh(true)) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const formatDate = (date) =>{
        const [ymd, rest] = date.split('T')
        const [hrs,min] = rest.split(':')
        const [year,month,day] = ymd.split('-')

        return year + '/' + month + '/' + day + ' ' + hrs + ':' + min
    }

    const handelCreatChat = () => {
        try {
            creatChat(workerId)
                .then( (id) => OnChat(id)) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handelRate = (num) => {
        setRate(num)
        try {
            addRate(workerId, num)
                .then( () =>{setRefresh(true)}) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    return <section className="profile"> 
            <div className="profile__images" onClick={onSearcher}>
                <img src={back}></img>
            </div>
            <div className="profile__top">
                <div className="profile__nameRating">
                    <h1>{results.name}</h1>
                    <div className="profile__ratings">
                        {handelStars(handelRatings(results.ratesWorker))}
                        <h2>{handelRatings(results.ratesWorker)}</h2> 
                    </div>
                </div>
                <h3>{results.surname}</h3>
                <div className="profile__comunication">
                    <div className="profile__chat" onClick={handelCreatChat}>Ask me something</div>
                    <div className="profile__contract"><h2>${results.pricingHour}/hr</h2><h3>Contract me</h3></div>
                </div>
            </div>
            <div className="profile__mid">
                <h2>Description</h2>
                <p>{results.description}</p>
                <div className="profile__direction">
                    <div className="profile__adress">
                        <h3><img src={pin}></img>{results.adress}</h3>
                    </div>
                    <h2>Up to: {results.workingDistance}Km</h2>
                </div>
            </div>
            <div className="profile__yourRate">
                <h2>Your rate:</h2>
                {!rate && <div className="profile__yourStars">
                        <img src={blackStar} onClick={ () => handelRate(1)}></img>
                        <img src={blackStar} onClick={ () => handelRate(2)}></img>
                        <img src={blackStar} onClick={ () => handelRate(3)}></img>
                        <img src={blackStar} onClick={ () => handelRate(4)}></img>
                        <img src={blackStar} onClick={ () => handelRate(5)}></img>
                    </div>}
                {rate && <div className="profile__ratedStars">{handelStars(rate)}</div>}
                <h2 className="profile__numberRate">{rate}</h2> 
            </div>
            <ul className="profile__workerRatings">
                <h2>Worker rates:</h2>
                {results.ratesWorker && results.ratesWorker.map( element => {
                    return <li className="profile__container" >
                                <h1 className="profile__stars">{handelStars(element.stars)}</h1>
                                <div className="profile__date"><p>{formatDate(element.date)}</p></div>
                        </li>
                })}
            </ul>
            <form onSubmit={handelAddComent}>
                <h2>Worker coments:</h2>
                <textarea name="coment" placeholder="Give your opinion about this worker" maxLength="150"></textarea>
                <button>Send comment</button>
            </form>
            <ul className="profile__coments">
                {results.comentsWorker && results.comentsWorker.map( element => {
                    return <li className="profile__container" >
                                <h1 className="profile__name">{element.name}</h1>
                                <p className="profile__description">{element.text}</p>
                                <div className="profile__date"><p>{formatDate(element.date)}</p></div>
                        </li>
                })}
            </ul>
            {error && <Feedback message={error} level="error" />}
        </section>
}