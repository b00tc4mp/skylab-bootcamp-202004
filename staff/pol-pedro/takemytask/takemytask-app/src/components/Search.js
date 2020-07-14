import React, {useState, useEffect} from 'react'
import './Search.sass'
import Feedback from './Feedback'
import SerachResults from './SearchResults'
import {searchWorker} from 'takemytask-client-logic'
import { useTransition, animated } from 'react-spring'
import searchIcon from './images/search.svg'
import cleaningIcon from './images/cleaningIcon.svg'
import electricianIcon from './images/electricianIcon.svg'
import carpentryIcon from './images/carpentryIcon.svg'
import gardeningIcon from './images/gardeningIcon.svg'

export default function Register({query, userName, onGoToLogin, onSearcher, onGoToWorker}) {

    const [error, setError] = useState('')
    const [results, setResults] = useState('')
    const [searchQuery, setSearchQuery] = useState(query)

    useEffect ( () => {
        if(searchQuery){
            try {
                setError('')
                searchWorker(true, true, searchQuery)
                .then( body => {
                    if(body.length > 0){
                        setResults(body)
                    }else{
                        setError('No results..')
                    }
                }) 
                    .catch(error => setError(error.message))
            }catch({message}){
                setError(message)
            }
        }
      }, [])
    

    const handleSubmit = (event) => {
        event.preventDefault()
        let { search } = event.target

        search = search.value

        setSearchQuery(search)

        onSearcher(search)

        try {
            setError('')
            searchWorker(true, true, search)
            .then( body => {
                    if(body.length > 0){
                        setResults(body)
                    }else{
                        setError('No results..')
                        setResults('')
                    }
                })
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handelClass = (value) => {
        
        onSearcher(value)

        setSearchQuery(value)

        try {
            setError('')
            searchWorker(true, true, value)
                .then( body => {
                    if(body.length > 0){
                        setResults(body)
                    }else{
                        setError('No results..')
                    }
                }) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    return <section className="search">
              
            {!userName && <div className="search__header" >
                        <h1 className="search__name">Search</h1>
                        <div className="search__login" onClick={onGoToLogin}>
                            <h2 className="search__loginName">Login</h2>
                        </div>
                    </div>}

            {userName && <div className="search__header" >
                    <h1 className="search__name">Search</h1>
                    <div className="search__foto">
                        <h2>foto</h2>
                    </div>
            </div>}

            <body className="search__body">
                <form className="search__searchInput">
                        <div className="search__serachContainer">
                            <form onSubmit={handleSubmit}>
                                <button>
                                    <img src={searchIcon}></img>
                                </button>
                                <input type="text" name="search" placeholder="What you need..." defaultValue={searchQuery}></input>
                            </form>
                        </div>
                </form>

                <div className="search__class">
                    <div onClick={ () => handelClass('Cleaning')}>
                        <img src={cleaningIcon}></img>
                    </div>
                    <div onClick={ () => handelClass('Gardening')}>
                        <img src={gardeningIcon}></img>
                    </div>
                    <div onClick={ () => handelClass('Carpentry')}>
                        <img src={carpentryIcon}></img>
                    </div>
                    <div onClick={ () => handelClass('Electrician')}>
                        <img src={electricianIcon}></img>
                    </div>
                    
                </div>

            </body>
            {results && <SerachResults results={results} onGoToWorker={onGoToWorker}/>}
            {error && <Feedback message={error} level="error" />}
        </section>
}