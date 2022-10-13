const {NotImplementedError} = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
    let strArray = str.split('');
    let result = '';
    let counter = 1;

    for (let i = 0; i < strArray.length; i++) {
        if (i !== strArray.length - 1) {
            if (strArray[i] === strArray[i + 1]) {
                counter++;
            } else if (counter === 1) {
                result += strArray[i];
            } else {
                result += `${counter}${strArray[i]}`;
                counter = 1;
            }
        } else if (counter === 1) {
            result += strArray[i];
        } else {
            result += `${counter}${strArray[i]}`;
            counter = 1;
        }
    }
    return result;
}

module.exports = {
    encodeLine
};
