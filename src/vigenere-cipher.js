const {NotImplementedError} = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
function fromAscii (symb) {
    return symb - 'A'.charCodeAt(0);
}


function toAscii (symb) {
    return symb + 'A'.charCodeAt(0);
}

class VigenereCipheringMachine {
    constructor(isDirect = true) {
        this.isDirect = isDirect;
    }

    encrypt(message, key) {
        if (!message || !key) {
            throw new Error('Incorrect arguments!');
        }


        message = message.toUpperCase();
        key = key.toUpperCase();
        let aCode = 'A'.charCodeAt(0);
        let zCode = "Z".charCodeAt(0);
        let keyIndex = 0;

        let result = message.split('').reduce((acc, curr, index) => {
            if (curr.charCodeAt(0) >= aCode && curr.charCodeAt(0) <= zCode) {
                acc += String.fromCharCode(toAscii((fromAscii(curr.charCodeAt(0)) + fromAscii(key.split('')[keyIndex % key.length].charCodeAt(0))) % 26));
                keyIndex++;
            } else
            {
                acc += curr;
            }
            return acc;
        },'')

        return this.isDirect ? result : result.split('').reverse().join('');
    }

    decrypt(encryptedMessage, key) {
        if (!encryptedMessage || !key) {
            throw new Error('Incorrect arguments!');
        }

        encryptedMessage = encryptedMessage.toUpperCase();
        key = key.toUpperCase();
        let aCode = 'A'.charCodeAt(0);
        let zCode = "Z".charCodeAt(0);
        let keyIndex = 0;

        let result = encryptedMessage.split('').reduce((acc, curr, index) => {
            if (curr.charCodeAt(0) >= aCode && curr.charCodeAt(0) <= zCode) {
                acc += String.fromCharCode(toAscii((fromAscii(curr.charCodeAt(0)) - fromAscii(key.split('')[keyIndex % key.length].charCodeAt(0)) + 26) % 26));
                keyIndex++;
            } else
            {
                acc += curr;
            }
            return acc;
        },'')

        return this.isDirect ? result : result.split('').reverse().join('');
    }
}

module.exports = {
    VigenereCipheringMachine
};
