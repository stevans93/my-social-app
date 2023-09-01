require('dotenv').config();
// const whiteList = ['http://localhost:3001', 'http://localhost:3000'];

module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    CORS_OPTIONS: {
        origin: (origin, callback) => {
            // if(whiteList.includes(origin)) {
            //     // callback(null, true);
            // } else {
            //     // callback(new Error("Not Allowed By Cors!"));
            // }
            callback(null, true);
        }
    }
}