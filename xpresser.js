const { init } = require("xpresser");
const config = require("./config");

// Initialize Xpresser
const $ = init(config);

module.exports = { $ };
