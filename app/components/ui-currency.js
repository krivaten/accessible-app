import Ember from 'ember';
import UiNum from 'accessible-app/components/ui-num';
import { numToWords } from 'accessible-app/utils/numbers';

const {
    computed,
    get
} = Ember;

const UiCurrency = UiNum.extend({
    classNames: ['ui-currency'],

    number: null,
    currencySymbol: '$',

    splitAmount: computed('number', function() {
        let number = get(this, 'number') || 0;
        number = String(number);
        return parseFloat(number).toFixed(2).split('.');
    }),

    formattedAmount: computed('number', function() {
        let splitAmount = get(this, 'splitAmount');
        let currencySymbol = get(this, 'currencySymbol');

        splitAmount[0] = splitAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return `${currencySymbol}${splitAmount.join('.')}`;
    }),

    label: computed('number', function() {
        let splitAmount = get(this, 'splitAmount');
        let result = [];

        splitAmount.forEach((item) => {
            result.push((item && item !== '00') ? numToWords(item) : null);
        });

        let [ dollars, cents ] = result;

        if (dollars && !cents) {
            return `${dollars} dollars`;
        } else if (dollars && cents) {
            return `${dollars} dollars and ${cents} cents`;
        }
    })
});

export default UiCurrency;
