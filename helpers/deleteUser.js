const db = require("../configs/mysql");
module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {
        db.query("DELETE FROM users" ,async (err, result) => {
            // console.log(borrower)
            if (err) {
                console.log(err)
                // res.status(500).json(err)
            } else {
                console.log('User collection cleared!');
                done()

            }
        })
    }

}