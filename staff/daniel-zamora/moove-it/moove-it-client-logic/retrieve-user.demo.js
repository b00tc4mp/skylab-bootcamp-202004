global.XMLHttpRequest = require('xhr2')
const retrieveUser = require('./retrieve-user')

return retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWQ4ZjIyZTY5NTYxNDVhYTE1MDg5NDEiLCJpYXQiOjE1OTEyNzc5MjEsImV4cCI6MTU5MTM2NDMyMX0.qrzQHYuEmXZgQlyrSlPiC8L3xomjBK6ugyXrI1ZKNwE')
    .then(console.log)
    .catch(console.log)