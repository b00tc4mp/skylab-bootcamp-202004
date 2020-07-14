global.XMLHttpRequest = require('xhr2')

const retrieveUserAssetAllocation = require('./retrieve-user-asset-allocation')

retrieveUserAssetAllocation('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU0YjQzZmMwYWU4ZGEzMzY5YzlhOTciLCJpYXQiOjE1OTIzODc5MjYsImV4cCI6MTU5MjQ3NDMyNn0.bsfOx-i2pZPt6RJxdNImdsPB9y7RJPGLJwMUVxdaXuk')
    .then(results => console.log(results))
    .catch(error => console.log(error))