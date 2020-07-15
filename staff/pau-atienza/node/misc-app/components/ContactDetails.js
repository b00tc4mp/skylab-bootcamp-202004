module.exports = contact => {
    
    const keys = Object.keys(contact)
    const values = Object.values(contact)

    return `<section class="users">
<h2>Contact Details</h2>
<ul>
${keys.reduce((acc, key, i) => 
    {if (key !== 'id' && key !== 'uniqueid') acc.push(`<li>${key}: ${values[i]}</li>`)
        return acc
    }, []).join('')}
</ul>
<a class="home__link" href="/contacts">Contacts</a>
</section>`}
