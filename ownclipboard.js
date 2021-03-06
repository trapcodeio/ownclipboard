const xpresser = require('xpresser');
const config = require('./config');

// Initialize Xpresser
const $ = xpresser(config);

// Check if dist folder exists.
const distFolderExistsOrError = (next) => {
    const distFolder = $.path.base('dist');

    if (!$.file.isDirectory(distFolder)) {
        return $.logErrorAndExit(`Dist folder not found: ${distFolder}, run 'yarn build' first!`)
    }

    return next();
};

$.on.expressInit([
    distFolderExistsOrError,
    require('./backend/extend')
]);


// Boot Server
$.boot();
