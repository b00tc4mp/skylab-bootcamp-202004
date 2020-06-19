global.XMLHttpRequest = require('xhr2')
const retrieveUser = require('./retrieve-user')

return retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWVjNzI0MWE1YzQ5ZDQ4Y2E3NzdjYTUiLCJpYXQiOjE1OTI1NTQzNDUsImV4cCI6MTU5MjY0MDc0NX0.AIu77-ydfAjv3i6c6yf9I5PmwkB6r80PatXkYuBdRpk')
    .then(console.log)
    .catch(console.log)