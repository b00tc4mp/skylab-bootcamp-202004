global.XMLHttpRequest = require('xhr2')

const retrieveUserBalance = require('./retrieve-user-balance')

retrieveUserBalance('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU0OTNmNTliYjc0ODVjMWM4MDhmNDMiLCJpYXQiOjE1OTIwNjEwMjYsImV4cCI6MTU5MjE0NzQyNn0.mRKoOw6_yOnqCT8OjS6f7KsI3apzWVBI_63T9Sc1rXA')
    .then(results => console.log(results))
    .catch(error => console.log(error))