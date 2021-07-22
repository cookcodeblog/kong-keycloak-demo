// environment variables
// username
// secret
var username = pm.environment.get('username');
var secret = pm.environment.get('secret');

var curDate = new Date().toGMTString();

var sha256digest = CryptoJS.SHA256(request.data);
var base64sha256 = CryptoJS.enc.Base64.stringify(sha256digest);
var computedDigest = 'SHA-256=' + base64sha256;

var signingString = "date: " + curDate + "\n" + "digest: " + computedDigest;
var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(signingString, secret));
var algorithm = "hmac-sha256";

var authorization = "hmac username=\"" + username + "\", algorithm=\"" + algorithm + "\", headers=\"date digest\", signature=\"" + signature + "\"";

// headers
// Date: {{curDate}}
// Digest: {{computedDigest}}
// Authorization: {{authorization}}
pm.environment.set("curDate", curDate);
pm.environment.set('digest', computedDigest);
pm.environment.set('authorization', authorization);

// debug
console.log(request.data);
console.log(curDate);
console.log(computedDigest);
console.log(signingString);
console.log(authorization);

