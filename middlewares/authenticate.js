const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = (req, res, next) => {
    // console.log("tes jir")
    if (req.headers.token) {
        // console.log(req.headers, "saya mau liat")
        var decoded = jwt.verify(req.headers.token, secret, function (err, decoded) {
            // console.log(decoded) // bar
            // console.log(err, "err")
            if (decoded !== undefined) {
                // console.log('hei')
                req.headers.decoded = decoded
                next()
            }
            else {
                // console.log('neng')
                throw ({
                    code: 400,
                    message: "Invalid Token"
                })
            }
        })

    } else {
        throw ({
            code: 401,
            message: "Login First"
        })
    }
}