import React, { useState } from 'react'
import Feedback from './Feedback'

export default function ({ }) {
    const [error, setError] = useState()

    return <section className="register">
        <h1>Update User</h1>
        <form onSubmit={}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <input type="password" name="oldPassword" placeholder="oldPassword" required minLength="8" />
            <button>Submit</button>
                or <a href="/" onClick={handleGoToLogin}>Login</a>

            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}