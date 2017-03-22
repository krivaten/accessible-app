import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ui num', function() {
    setupComponentTest('ui-num', {
        integration: true
    });

    let message;

    it('passes a11y test', function() {
        this.render(hbs`{{ui-num '123.50'}}`);

        a11yAudit(this.$()).then((err) => expect(err).to.be.undefined);
    });

    it('properly renders default values', function() {
        this.render(hbs`{{ui-num}}`);

        message = 'value is defaulted to 0';
        expect(this.$('.ui-num').text().trim(), message).to.eq('0');

        message = 'aria-label is defaulted to zero';
        expect(this.$('.ui-num').attr('aria-label'), message).to.eq('zero');
    });

    it('properly renders a simple value', function() {
        this.render(hbs`{{ui-num '10354'}}`);

        message = 'value is defaulted to 0';
        expect(this.$('.ui-num').text().trim(), message).to.eq('10,354');

        message = 'aria-label is defaulted to zero';
        expect(this.$('.ui-num').attr('aria-label'), message).to.eq('ten thousand, three hundred fifty-four');
    });

    it('properly renders a simple decimal value', function() {
        this.render(hbs`{{ui-num '35.65'}}`);

        message = 'value is defaulted to 0';
        expect(this.$('.ui-num').text().trim(), message).to.eq('35.65');

        message = 'aria-label is defaulted to zero';
        expect(this.$('.ui-num').attr('aria-label'), message).to.eq('thirty-five point sixty-five');
    });

    it('properly renders a multi decimal value', function() {
        this.render(hbs`{{ui-num '194.168.9.2'}}`);

        message = 'value is defaulted to 0';
        expect(this.$('.ui-num').text().trim(), message).to.eq('194.168.9.2');

        message = 'aria-label is defaulted to zero';
        expect(this.$('.ui-num').attr('aria-label'), message).to.eq('one hundred ninety-four point one hundred sixty-eight point nine point two');
    });
});
