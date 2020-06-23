import React, {useState, useEffect} from 'react'
import './User.sass'
import Feedback from './Feedback'
import {retriveUser, updateUser} from 'takemytask-client-logic'


export default function Register({role, onLogout}) {

    const [error, setError] = useState('')
    const [succes, setSucces] = useState('')
    const [results, setResults] = useState('')

    useEffect ( () => {
        
        try {
            retriveUser()
                .then( body => setResults(body)) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
        
      }, [])

      const handelCheckbox = (value) => {
        for(var i in results.jobCategories){
            if(results.jobCategories[i] === value){
                return true
            }
        }
        return false
      }

      const handelUserSubmit = (event) =>{
        event.preventDefault()
        let { name, surname, email, adress} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        adress = adress.value

        try{
            updateUser(name, surname, email, adress)
                .then(() => setSucces('User updated'))
                .catch((error) => setError(error))
        }catch({message}){
            setError(message)
        }
      }

      const handelWorkerSubmit = (event) =>{
        event.preventDefault()
        let { name, surname, email, adress, bankAcount, description, presentation, pricingHour, workingDistance} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        adress = adress.value
        bankAcount = bankAcount.value
        description = description.value
        presentation = presentation.value
        pricingHour = Number(pricingHour.value)
        workingDistance = Number(workingDistance.value)


        try{
            updateUser(name, surname, email, adress, bankAcount, description, presentation, pricingHour, workingDistance)
                .then(() => setSucces('User updated'))
                .catch((error) => setError(error))
        }catch({message}){
            setError(message)
        }
      }

    return <section className="user"> 

            <div className="user__header" >
                    <h1 className="user__name">Chat</h1>
                    <div className="user__logout" onClick={onLogout}>
                        <h2>Logout</h2>
                    </div>
            </div>
            {role === 'user' && <div>
                <form onSubmit={handelUserSubmit}>
                    <input type="text" name="name" defaultValue={results.name}></input>
                    <input type="text" name="surname" defaultValue={results.surname}></input>
                    <input type="text" name="email" defaultValue={results.email}></input>
                    <input type="text" name="adress" defaultValue={results.adress}></input>
                    <button>Upate</button>
                </form>
            </div>}

            {role === 'worker' && <div>
                <form onSubmit={handelWorkerSubmit}>

                    <input type="text" name="name" placeholder="Name" required pattern="[A-Za-z]{1,20}" defaultValue={results.name}/>

                    <input type="text" name="surname" placeholder="Surname" required pattern="[A-Za-z]{1,20}" defaultValue={results.surname}/>

                    <input type="email" name="email" placeholder="Email" required defaultValue={results.email}/>

                    <input type="text" name="adress" placeholder="Adress" defaultValue={results.adress}/>

                    <input type="text" name="bankAcount" placeholder="bankAcount" defaultValue={results.bankAcount}/>

                    <input type="text" name="presentation" placeholder="presentation" maxLength="45" defaultValue={results.presentation}/>

                    <textarea type="textarea" name="description" placeholder="description" maxLength="250" defaultValue={results.description}></textarea>

                    <input type="number" name="pricingHour" placeholder="pricingHour" min="5" max="50" defaultValue={results.pricingHour}/>

                    <input type="number" name="workingDistance" placeholder="Moving distance (km)" min="10" max="100"  defaultValue={results.workingDistance}/>

                    <button>Upate</button>

                </form>
            </div>}
            {error && <Feedback message={error} level="error" />}
            {succes && <Feedback message={succes} level="succes" />}
            
        </section>
}