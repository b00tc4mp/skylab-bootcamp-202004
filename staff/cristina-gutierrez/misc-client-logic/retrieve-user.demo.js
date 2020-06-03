global.XMLHttpRequest = require('xhr2')

const registerUser = require('./retrieve-user')

registerUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWQ3NTFmMTg5NDMyZTNiZjQwYmNmOTgiLCJpYXQiOjE1OTExNjk4MDQsImV4cCI6MTU5MTI1NjIwNH0.jaG2gmUCbjYITCf6NyKmbXOXO6PDI7BJnnoq7JZ2ioM')
    .then((response) => console.log(response))
    .catch(error => console.error(error))