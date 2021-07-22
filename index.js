'use strict'

const express = require('express')
const index = express()

const path = require('path')
const indexHTML = path.join(__dirname, 'index.html')
const keycloakJSON = path.join(__dirname, 'keycloak.json')

index.get('/', function (req, res) {
    res.sendFile(indexHTML)
})

index.get('/keycloak.json', function (req, res) {
    res.sendFile(keycloakJSON)
})

const port = 3000
index.listen(port)
console.log(`Server is listening on http://localhost:${port}`)