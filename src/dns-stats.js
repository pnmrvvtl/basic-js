const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  let result = {};
  let resultSet = new Set();
  let temp = domains.map((el) => el.split('.').reverse());
  for (let i = 0; i < temp.length; i++) {
    let domain = '';
    for (let j = 0; j < temp[i].length; j++) {
      domain += `.${temp[i][j]}`;
      if (resultSet.has(domain)) {
        result[domain] = result[domain] + 1;
      } else {
        result[domain] = 1;
        resultSet.add(domain);
      }
    }
  }
  return result;
}

module.exports = {
  getDNSStats
};
