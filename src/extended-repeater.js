const {NotImplementedError} = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
    let result = '';
    let additional = '';
    for (let j = 0; j < options.additionRepeatTimes - 1; j++) {
        additional += options.addition;
        if (options.additionSeparator !== undefined) {
            additional += options.additionSeparator;
        } else {
            additional += '|';
        }
    }
    additional += options.addition;
    for (let i = 0; i < options.repeatTimes - 1; i++) {
        result += str;
        if (options.addition !== undefined) {
            result += additional;
        }
        if (options.separator !== undefined) {
            result += options.separator;
        } else {
            result += '+';
        }
    }
    result += str;
    if (options.addition !== undefined) {
        result += additional;
    }
    return result;
}

module.exports = {
    repeater
};
