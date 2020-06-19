global.XMLHttpRequest = require('xhr2')
const retrieveUserBlueprints = require('./retrieve-user-blueprint')

return retrieveUserBlueprints("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU5ZTljYzEzMGY4OTNjZTgwZTcyYTEiLCJpYXQiOjE1OTI0MDU1MDQsImV4cCI6MTU5MjQ5MTkwNH0.0-R66yqHEP-36JDD01mhMsekV-B119kdeavEJ01RqGE")
    .then(console.log)