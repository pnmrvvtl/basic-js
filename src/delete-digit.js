const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let result = -Infinity;
  for(let i = 0;i < n.toString().length;i++) {
    if(Number(n.toString().slice(0, i) + (i === n.toString().length - 1 ? '' : n.toString().slice(i + 1))) > result) {
      result = Number(n.toString().slice(0, i) + (i === n.toString().length - 1 ? '' : n.toString().slice(i + 1)));
    }
  }
  return result;
}

module.exports = {
  deleteDigit
};
