'use stric'
function Landing(callback){ 
const temp = document.createElement('div')

temp.innerHTML = `<section class="landing">
<h1>Wellcome to my App</h1>
<button class='register'>Register</button>
<button class='login'>Login</button>
</section>`

const container = temp.firstChild

const registerButton = container.querySelector('.register')

registerButton.addEventListener('click', function(){

    callback()
})
return container
}