const message = require('./messages')

function checkIntegerId(req, res, next) {
    let { id, id_user } = req.params

    if (id_user) {
        id = id_user
    }

    if (id) {
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({ message: message.idNotInteger })
        } else {
            next()
        }
    } else {
        next()
    }
}

function checkFields(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: message.emptyFields })
    } else {
        next()
    }
}

module.exports = {
    checkIntegerId,
    checkFields
}