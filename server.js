const xpresser = require('xpresser');
const config = require('./config');

// Initialize Xpresser
const $ = xpresser(config);

// Boot Server
$.boot();
