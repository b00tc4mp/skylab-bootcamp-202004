// TODO show "Welcome, <name>!"

function Home (user) {
    const temp = document.createElement('div')
    
    temp.innerHTML = `<section class="home">
    <h1>Home</h1>
    <p>Welcome ${user.name} ${user.surname}</p>
</section>`

    return temp.firstChild

}