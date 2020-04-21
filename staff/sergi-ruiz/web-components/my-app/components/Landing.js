function Landing(onLogin, onRegister) {
    const temp = document.createElement('div');

    temp.innerHTML = `<section class="landing">
    <h1>Welcome, to my App</h1>
    <a href="">Login</a> <a href="">Register</a>
    </section>`

    const container = temp.firstChild;

    const [login, register] = container.querySelectorAll('a')

    login.addEventListener('click', function(event) {
        event.preventDefault();
        onLogin();
    });

    register.addEventListener('click', function() {
        event.preventDefault();
        onRegister();
    });

    return container
}
/*
function Landing(onRegister, onLogin) { debugger
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="landing">
    <a href="">Register</a> or <a href="">Login</a>
</section>`

    const container = temp.firstChild

    // const anchors = container.querySelectorAll('a')
    // const register = anchors[0]
    // const login = anchors[1]

    const [register, login] = container.querySelectorAll('a')

    register.addEventListener('click', function(event) {
        event.preventDefault()

        onRegister()
    })

    login.addEventListener('click', function(event) {
        event.preventDefault()

        onLogin()
    })

    return container
}*/