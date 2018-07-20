const message = require('./messages')

module.exports = function(req, res, next) {
    let { id, id_user } = req.params

    if (id) {
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({ message: message.idNotInteger })
        }
    }

    if (id_user) {
        if (!Number.isInteger(parseInt(id_user))) {
            return res.status(400).json({ message: message.idNotInteger })
        }
    }

    next()
}