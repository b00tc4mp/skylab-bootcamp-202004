global.XMLHttpRequest = require('xhr2')
const retrieveUser = require('./retrieve-user')

return retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU5ZTYxMTEzMGY4OTNjZTgwZTcyYTAiLCJpYXQiOjE1OTIzOTEyMDMsImV4cCI6MTU5MjQ3NzYwM30.rbd8u4uQMPNpfclfVJE2FPUo4xoC70gu6XIHWb9cJOE')
    .then(console.log)
    .catch(console.log)