'use stritc'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'juandomingoperon_secret_key';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Forbidden access is denied" });
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');
        try {
            var payload = jwt.decode(token, secretKey);
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ message: "Access token expired" });
            }
        } catch (ex) {
            return res.status(404).send({ message: "Access token invalid" });
        }

        req.user = payload;

        next();
    }
}
