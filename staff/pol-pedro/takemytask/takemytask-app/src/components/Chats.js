import React, {useState, useEffect} from 'react'
import './Chats.sass'
import Feedback from './Feedback'
import {retriveUser, retriveChats} from 'takemytask-client-logic'

export default function Register({userName, role, onChats, OnChat}) {

    const [error, setError] = useState('')
    const [results, setResults] = useState('')


    const update = () => {
        try {
            retriveChats()
                .then( body =>{
                    let resultArray = []
                    body.map(elem => {
                        if(elem.worker.role === "worker"){
                            resultArray.push({id: elem._id, nameUser: elem.worker.name, lastMessage: elem.messages[0].text, lastDate: elem.messages[0].date })
                        }else{
                            resultArray.push({id: elem._id, nameUser: elem.user.name, lastMessage: elem.messages[0].text, lastDate: elem.messages[0].date })
                        }
                    })
                    resultArray.sort(function (a, b) {
                        if (a.lastDate > b.lastDate) {
                          return -1;
                        }
                        if (a.lastDate < b.lastDate) {
                          return 1;
                        }
                        return 0;
                      })
                    setResults(resultArray)
                }) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    useEffect ( () => {
        onChats()

        update()
    }, [])

    useEffect (() => {
        const interval = setInterval(() => {
            update()
        }, 5000)

        return () => clearInterval(interval)
    })

    const formatDate = (date) =>{
        const [ymd, rest] = date.split('T')
        const [hrs,min] = rest.split(':')
        const [year,month,day] = ymd.split('-')

        return year + '/' + month + '/' + day + ' ' + hrs + ':' + min
    }

    return <section className="chat">
            <div className="chat__header" >
                    <h1 className="chat__name">Chat</h1>
                    <div className="chat__foto">
                        <h2>foto</h2>
                    </div>
            </div>
            <ul className="chat__messages">
                {results && results.map( element => {
                    return <li className="chat__container"  onClick={ () => OnChat(element.id)}>

                                <div className="chat__fotoUser"></div>

                                <div className="chat__info">
                                    <h1 className="chat__name">{element.nameUser}</h1>
                                    <p className="chat__lastmessage">{element.lastMessage}</p>
                                    <p className="chat__date">{formatDate(element.lastDate)}</p>
                                </div>
                                
                        </li>
                })}
            </ul>
            <div className="chat__body"></div>
            {error && <Feedback message={error} level="error" />}
        </section>
}