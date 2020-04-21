function Landing(inRegister, inLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = ` <section class="landing">
    <a href="">Register</a> or <a href="">Login</a>
    </section>`

    const container = temp.firstChild;

    const links = container.querySelectorAll('a')
    const register = links[0];
    const login = links[1];

    register.addEventListener ('click', function(event) {
        inRegister();
    });
  

    login.addEventListener ('click', function(event){
        inLogin();
    });
    return container;
}