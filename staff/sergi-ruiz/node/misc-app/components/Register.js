extend App

block body
    section.register
    h1 Register
    form(action='/register' method='POST')
        input(type='text' name='name' placeholder='name')
        input(type='text' name='surname' placeholder='surname')
        input(type='email' name='email' placeholder='e-mail')
        input(type='password' name='password' placeholder='password')
        button Submit
        |         or 
        a(href='/login') Login
    |     #{feedback ? feedback : ''}

