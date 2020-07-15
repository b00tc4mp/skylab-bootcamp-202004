global.XMLHttpRequest = require('xhr2')
const retrieveBlueprint = require('./retrieve-blueprint')

return retrieveBlueprint("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWVjYTBkM2RhMjhkZjNiNDkzNTBmM2EiLCJpYXQiOjE1OTI1NjU5NzUsImV4cCI6MTU5MjY1MjM3NX0.6DYpHpjRoRXW4Nk3k0x8WPV_iQfNZVOKgHc33RxwTUs", '5eeca0e7da28df3b49350f3c')
    .then(console.log)