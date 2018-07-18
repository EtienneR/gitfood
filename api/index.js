const app = require('./app')
const host = process.env.API_HOST
const port = process.env.API_PORT

app.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}`);
})