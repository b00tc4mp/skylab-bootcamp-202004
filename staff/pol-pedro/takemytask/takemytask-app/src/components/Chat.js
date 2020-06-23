import React, {useState, useEffect} from 'react'
import './Chat.sass'
import Feedback from './Feedback'
import {retriveChat, addMessage} from 'takemytask-client-logic'
import backBlack from './images/backBlack.svg'

export default function Register({chatId, userName, userId, onGoToChat}) {

    const [error, setError] = useState('')
    const [results, setResults] = useState('')
    const [chatName, setChatName] = useState('')


    const update = () => {
        try {
            retriveChat(chatId)
                .then( body =>{
                    let resultArray = []
                    let name
                    body.messages.map(elem => {
                            resultArray.push({id: elem.userId, name: elem.name, surname: elem.surname, text: elem.text, date: elem.date })

                            if(elem.userId != userId && elem.name){
                                name = elem.name
                            }
                        
                    })
                        
                    setChatName(name)
                    setResults(resultArray)
                }) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    useEffect ( () => {
        update()
    }, [])

    useEffect (() => {
        const interval = setInterval(() => {
            update()
        }, 1000)

        return () => clearInterval(interval)
    })

    const formatDate = (date) =>{
        const [ymd, rest] = date.split('T')
        const [hrs,min] = rest.split(':')
        const [year,month,day] = ymd.split('-')

        return year + '/' + month + '/' + day + ' ' + hrs + ':' + min
    }

    const handelAddMessage = (event) => {
        setError("")
        event.preventDefault()
        let {message} = event.target
        message = message.value
        try {
            addMessage(chatId, message)
                .then( () => {}) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setError("")
            event.preventDefault()
            let message = event.target
            message = message.value
            //TODO NOT SEND WEN MESSAGE IS EMPTY
            try {
                addMessage(chatId, message)
                    .then( () => {}) 
                    .catch(error => setError(error.message))
            }catch({message}){
                setError(message)
            }
          }
    }

    return <section className="inChat">
            <div className="inChat__header" >
                    <img src={backBlack} onClick={onGoToChat}></img>
                    <h1 className="inChat__name">{chatName}</h1>
                    <div className="inChat__foto">
                        <h2>foto</h2>
                    </div>
            </div>
            <ul className="inChat__messages">
                {error && <Feedback message={error} level="error" />}
                {results && results.map( element => {
                    return <li className="inChat__container">
                                
                                {element.id != userId && <div className="inChat__info--sender">
                                    <p className="inChat__message">{element.text}</p>
                                    <p className="inChat__date">{formatDate(element.date)}</p>
                                </div> }

                                {element.id == userId && <div className="inChat__info">
                                    <p className="inChat__message">{element.text}</p>
                                    <p className="inChat__date">{formatDate(element.date)}</p>
                                </div> }
                            </li>
                })}
            </ul>
            <div className="inChat__body"></div>
            <div className="inChat__footer">
                <form onSubmit={handelAddMessage} onKeyDown={handleKeyDown}>
            <textarea name="message" placeholder="Rite a message" maxLength="250"></textarea>
                    <button>Send</button>
                </form>
            </div>
        </section>
}