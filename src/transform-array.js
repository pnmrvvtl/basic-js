const {NotImplementedError} = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
    if (!Array.isArray(arr)) throw new Error('\'arr\' parameter must be an instance of the Array!');
    let discN = false, discP = false, doubleN = false, doubleP = false, doubled = false;

    let i = 0, result = [];

    while (i < arr.length) {
        switch (arr[i]) {
            case '--discard-next':
                if (arr[i + 2] && ((arr[i + 2] === '--discard-prev') || (arr[i + 2] === '--double-prev'))) {
                    i = i + 3;
                } else {
                    i = i + 2;
                }
                break;
            case '--discard-prev':
                result.pop();
                i++;
                break;
            case '--double-next':
                if (arr[i + 1] && arr[i + 2] && arr[i + 2] === '--discard-prev') {
                    result.push(arr[i + 1]);
                    i = i + 3;
                } else if (arr[i + 1] && arr[i + 2] && arr[i + 2] === '--double-prev') {
                    result.push(arr[i + 1]);
                    result.push(arr[i + 1]);
                    result.push(arr[i + 1]);
                    i = i + 3;
                } else if (arr[i + 1]) {
                    result.push(arr[i + 1]);
                    result.push(arr[i + 1]);
                    i = i + 2;
                } else {
                    i++;
                }
                break;
            case '--double-prev':
                if(result[result.length - 1]) {
                    result.push(result[result.length - 1]);
                }
                i++;
                break;
            default:
                result.push(arr[i]);
                i++;
                break;
        }
    }
    return result;
}

module.exports = {
    transform
};
