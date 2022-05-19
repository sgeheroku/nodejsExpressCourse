const moment = require('moment');
const middlewareLogger = (req, res, next) => {
    console.log(`${req.protocol}:://${req.get('host')}${req.originalUrl} ${moment().format()}`);
    next();
}

module.exports = middlewareLogger;