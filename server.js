const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)
mongoose.set("strictQuery", false);


// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(DB);
    console.log('Connected To DataBase');
}

const port = process.env.NODE_ENV === 'dev' ? 8001 : 8000;
let appServer = app.listen(port, () => {
    console.log(`Server running on PORT ${port}.`);
})

process.on('SIGINT', () => {
    appServer.close();
    console.log('Server closed gracefully.');
    process.exit(0);
});

module.exports = appServer;