const path = require('path');

module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": path.join(__dirname, `../../db/dev.users.sqlite`)
    },
    "test": {
        "dialect": "sqlite",
        "storage": path.join(__dirname, `../../db/test.users.sqlite`)
    },
};
