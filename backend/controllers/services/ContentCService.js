"use strict";
const Content = $.use.model('Content');
/**
 * ContentCService
 * @type {XpresserController.Services|*}
 */
const ContentCService = {};
ContentCService.namespace = "content";

ContentCService.add = async (opt, {http, boot: {user}, error}) => {
    const user_id = user.id;
    const isApi = opt === 'api';

    let exists = true;
    let text = http.body('content', undefined);
    if (!text || (text && !text.trim().length)) {
        const message = `Content is empty.`;
        const type = 'empty_content';

        if (isApi) {
            return error({type, message}, 422);
        } else {
            return error(message);
        }
    }

    text = text.trim();


    const isUrl = $$.validURL(text);
    const type = isUrl ? 'url' : 'text';


    let content = await Content.query().where({user_id, content: text}).first();
    if (!content) {
        content = await Content.query().insert({
            code: $.helpers.randomStr(20),
            type,
            user_id,
            content: text,
        });

        exists = false;
    }

    content.$pick(Content.jsPick);
    const data = {content, exists};

    return isApi ? $$.toApi(http, data) : http.toApi(data);
};

module.exports = ContentCService;
