'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/data', function (req, res) {
    if (!req.headers['authorization']) return res.end()
    let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
    let decToken = jwt.decode(encToken)
    console.log("-----------------")
    console.log(decToken)
    console.log("-----------------")
    console.log(decToken.resource_access)
    let realmAccess = decToken.realm_access

    console.log(realmAccess)
    if (realmAccess && realmAccess.roles.includes('subscribed'))
        res.json(['cat', 'dog', 'cow'])
    else
        res.json([])
})

const port = 3001
app.listen(port)
console.log(`Server is listening on http://localhost:${port}`)
