
const { useState } = React



function Register() {


    return <section className="register">
                <h2>Register</h2>
            <form onSubmit>
                <input type="text" name="name"></input>
                <input type="text" name="surname"></input>
                <input type="text" name="email"></input>
                <input type="text" name="password"></input>
                <button>Submit</button>
            </form>

        </section>

    

}

