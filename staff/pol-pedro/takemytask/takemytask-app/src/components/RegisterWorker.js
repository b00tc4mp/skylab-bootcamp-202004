import React, {useState, useEffect} from 'react'
import './RegisterWorker.sass'
import Feedback from './Feedback'
import {registerWorker} from 'takemytask-client-logic'

export default function Register({onRegister, onGoToLogin, onGoToHome}) {

    const [error, setError] = useState('')
    

    const handleSubmit = (event) => {
        event.preventDefault()
        let { name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, checkboxFive, checkboxFour, checkboxThree, checkboxTwo, workingDistance} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        adress = adress.value
        bankAcount = bankAcount.value
        description = description.value
        presentation = presentation.value
        pricingHour = Number(pricingHour.value)
        let jobArray = []
        if(checkboxFive.checked) jobArray.push(checkboxFive.value)
        if(checkboxFour.checked) jobArray.push(checkboxFour.value)
        if(checkboxThree.checked) jobArray.push(checkboxThree.value)
        if(checkboxTwo.checked) jobArray.push(checkboxTwo.value)
        workingDistance = Number(workingDistance.value)

        try {
            setError('')
            registerWorker(name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobArray, workingDistance)
                .then(onRegister) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handelInput = () => {
        setError('')
    }

    return <section className="registerWorker">
            <form onSubmit = {handleSubmit} onInput={handelInput}>

                <input type="text" name="name" placeholder="Name" required pattern="[A-Za-z]{1,20}" />

                <input type="text" name="surname" placeholder="Surname" required pattern="[A-Za-z]{1,20}" />

                <input type="email" name="email" placeholder="Email" required />

                <input type="password" name="password" placeholder="Password" required minLength="8" />

                <input type="text" name="adress" placeholder="Adress" />

                <input type="text" name="bankAcount" placeholder="bankAcount" />

                <input type="textarea" name="presentation" placeholder="presentation" maxLength="45"/>

                <textarea type="textarea" name="description" placeholder="description" maxLength="250"></textarea>

                <input type="number" name="pricingHour" placeholder="pricingHour" min="5" max="50"/>

                <h2>Job categories</h2>

                <ul className="registerWorker__checkbox">
                    <li>
                        <input type="checkbox" id="checkboxTwo" name="checkboxTwo" value="Electrician"/>
                        <label for="checkboxTwo">Electrician</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxThree" name="checkboxThree" value="Cleaning"/>
                        <label for="checkboxThree">Cleaning</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxFour" name="checkboxFour" value="Gardening"/>
                        <label for="checkboxFour">Gardening</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxFive" name="checkboxFive" value="Carpentry"/>
                        <label for="checkboxFive">Carpentry</label>
                    </li>
                    
                </ul>

                <input type="number" name="workingDistance" placeholder="Moving distance (km)" min="10" max="100"/>

                <br/>
                <button>Start working </button>
                <br/>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
}

{/* <label for="jobCategories1" className="registerWorker__checkbox">Electrician
                    <input type="checkbox" name="jobCategories1" value="Electrician" />
                    <span className="registerWorker__checkmark"></span>
                </label>

                <label for="jobCategories2" className="registerWorker__checkbox">Carpentry
                    <input type="checkbox" name="jobCategories2" value="Carpentry" />
                    <span className="registerWorker__checkmark"></span>
                </label>

                <label for="jobCategories3" className="registerWorker__checkbox">Gardening
                    <input type="checkbox" name="jobCategories3" value="Gardening" />
                    <span className="registerWorker__checkmark"></span>
                </label>

                <label for="jobCategories4" className="registerWorker__checkbox">Cleaning
                    <input type="checkbox" name="jobCategories4" value="Cleaning" />
                    <span className="registerWorker__checkmark"></span>
                </label> */}