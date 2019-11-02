module.exports = (next) => {
    const $$ = {};


    $$.defaultErrorHandler = (http, error) => {
        if (typeof error === "object") {
            return http.toApiFalse(error);
        } else {
            return http.sayToApiFalse(error)
        }
    };

    $$.defaultApiErrorHandler = (http, error, status = 200) => {
        return http.res.status(status).json({status, error});
    };

    $$.toApi = (http, data, status = 200) => {
        return http.res.status(status).json({status, data});
    };

    $$.validURL = (str) => {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return regexp.test(str);
    };

    $$.nl2br = (str, is_xhtml = false) => {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };

    // eslint-disable-next-line no-useless-escape
    $$.htmlEntities = (rawStr) => rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });


    global['$$'] = $$;

    return next();
};
