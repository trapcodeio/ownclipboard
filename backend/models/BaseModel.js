const BaseModel = require('@xpresser/sql/lib/BaseModel');
const {pick} = require('lodash');

/**
 * Replace objection deprecated $pick method
 * @param keys
 * @return {*}
 */
BaseModel.prototype.$pick = function(keys) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  
  return pick(this, keys);
};

module.exports = BaseModel;