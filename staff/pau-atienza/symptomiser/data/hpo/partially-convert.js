const fs = require('fs')
const {termsNdjson: transform} = require('./oboparser')
const path = require('path')

const stream = fs.createReadStream(path.join(__dirname, 'hp.obo'))
transform(stream).pipe(fs.createWriteStream(path.join(__dirname, 'hp.json')))