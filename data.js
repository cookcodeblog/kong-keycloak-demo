'use strict'

const express = require('express')

const data = express()

data.get('/data', function (req, res) {
    res.json(['cat', 'dog', 'cow'])
})

const port = 3001
data.listen(port)
console.log(`Server is listening on http://localhost:${port}`)
