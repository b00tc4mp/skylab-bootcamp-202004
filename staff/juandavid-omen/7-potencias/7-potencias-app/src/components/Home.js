import React, { useState, useEffect } from 'react'
import { retrieveUser } from '7-potencias-client-logic'
import './Home.sass'

export default function Home ({ token }) {
  const [error, setError] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    try {
      retrieveUser(token)
        .then(({ name }) => setName(name))
        .catch(error => setError(error.message))
    } catch ({ message }) {
      setError(message)
    }
  }, [token])

  return (
    <section className='home'>
      <h1>Introduction</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<br />
        Aenean commodo ligula eget dolor. Aenean massa.<br />
        Cum sociis natoque penatibus et magnis dis parturient montes,<br />
        nascetur ridiculus mus. Donec quam felis,<br />
        ultricies nec, pellentesque eu, pretium quis, sem.<br />
        Nulla consequat massa quis enim.<br />
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.<br />
        In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.<br />
        Nullam dictum felis eu pede mollis pretium.<br />
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.<br />
        Aenean vulputate eleifend tellus.<br />
        Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.<br />
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.<br />
        Phasellus viverra nulla ut metus varius laoreet.<br />
        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.<br />
        Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.<br />
        Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero,<br />
        sit amet adipiscing sem neque sed ipsum.<br />
        Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.<br />
        Maecenas nec odio et ante tincidunt tempus.<br />
        Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.<br />
        Etiam sit amet orci eget eros faucibus tincidunt.<br />
        Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.<br />
        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.<br />
      </p>
    </section>
  )
}
