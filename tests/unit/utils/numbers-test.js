import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import { numToWords } from 'accessible-app/utils/numbers';

describe('Unit | Util | numbers', function() {
    setupTest('util:numbers');

    it('properly executs numToWords', function() {
        expect(numToWords(0)).to.eq('zero');
        expect(numToWords(5)).to.eq('five');
        expect(numToWords(15)).to.eq('fifteen');
        expect(numToWords(33)).to.eq('thirty-three');
        expect(numToWords(739)).to.eq('seven hundred thirty-nine');
        expect(numToWords(3475)).to.eq('three thousand, four hundred seventy-five');
        expect(numToWords(1253536)).to.eq('one million, two hundred fifty-three thousand, five hundred thirty-six');
        expect(numToWords(52735982634)).to.eq('fifty-two billion, seven hundred thirty-five million, nine hundred eighty-two thousand, six hundred thirty-four');
    });
});
