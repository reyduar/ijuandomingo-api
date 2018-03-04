'use stritc'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'juandomingoperon_secret_key';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.nombre,
        surname: user.apellido,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secretKey);
}