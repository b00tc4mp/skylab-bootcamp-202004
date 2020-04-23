function Landing(onRegister, onLogin) {
    Component.call(this, `<section class="landing">
    <a href="">Register</a> or <a href="">Login</a>
</section>`)

    // const anchors = container.querySelectorAll('a')
    // const register = anchors[0]
    // const login = anchors[1]

    const [register, login] = this.container.querySelectorAll('a')

    register.addEventListener('click', function (event) {
        event.preventDefault()

        onRegister()
    })

    login.addEventListener('click', function (event) {
        event.preventDefault()

        onLogin()
    })
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing