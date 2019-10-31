const xpresser = require('xpresser');
const config = require('./config');

// Initialize Xpresser
const $ = xpresser(config);

$.on.bootServer(require('./backend/extend'));
// Boot Server
$.boot();
