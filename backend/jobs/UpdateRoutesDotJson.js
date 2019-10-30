const fs = $.file.fs();
const PathHelper = require('xpresser/dist/src/Helpers/Path');

/**
 *  Job: updateRoutesJson
 */
module.exports = {
    command: 'updateRoutesJson',
    // Job Handler
    handler(args, job) {
        // Your Job Here
        const $path = $.path.storage('shared/routes.json');
        const $pathEncoded = $.path.storage('shared/routes-encrypted.json');

        if (!fs.existsSync($path)) {
            PathHelper.makeDirIfNotExist($path, true);
        }

        if (!fs.existsSync($pathEncoded)) {
            PathHelper.makeDirIfNotExist($pathEncoded, true);
        }

        const data = $.routerEngine.nameToUrl();
        const orderedData = {};

        Object.keys(data).sort().forEach(function (key) {
            orderedData[key] = data[key];
        });

        const routesToString = JSON.stringify(orderedData, null, 2);
        const routesToStringEncoded = JSON.stringify({
            ___: $.base64.encode(orderedData)
        }, null, 2);

        fs.writeFileSync($path, routesToString);
        fs.writeFileSync($pathEncoded, routesToStringEncoded);

        $.log("File: {storage/shared/routes.json} Updated");
        $.log("File: {storage/shared/routes-encrypted.json} Updated");


        // End of job
        if (job) job.end();
    }
};
