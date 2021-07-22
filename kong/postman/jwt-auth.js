// JWT generation script adapted from
// https://gist.github.com/corbanb/db03150abbe899285d6a86cc480f674d

var jwtSecret = pm.environment.get('jwt_secret') || ''

// Set headers for JWT
var header = {
    'typ': 'JWT',
    'alg': 'HS256'
};

// Prepare timestamp in seconds
var currentTimestamp = Math.floor(Date.now() / 1000)

var data = {
    'iss': pm.environment.get('jwt_iss') || '',
    'ist': pm.environment.get('jwt_ist') || '',
    'iat': currentTimestamp,
    'exp': currentTimestamp + 30, // expiry time is 30 seconds from time of creation
    'jti': 'jwt_nonce'
}


function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source)

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '')

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')

    return encodedSource
}

// encode header
var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
var encodedHeader = base64url(stringifiedHeader)

// encode data
var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
var encodedData = base64url(stringifiedData)

// build token
var token = `${encodedHeader}.${encodedData}`

// sign token
var signature = CryptoJS.HmacSHA256(token, jwtSecret)
signature = base64url(signature)
var signedToken = `${token}.${signature}`

pm.environment.set('jwt_signed', signedToken)
console.log('Signed and encoded JWT', signedToken)
