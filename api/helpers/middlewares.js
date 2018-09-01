const message = require('./messages')

function checkIntegerId(req, res, next) {
    const { id, id_user } = req.params

    if (id || id_user) {
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({ message: message.idNotInteger })
        }
    }

    next()
}

function checkFields(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: message.emptyFields })
    }

    next()
}

module.exports = {
    checkIntegerId,
    checkFields
}