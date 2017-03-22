import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ui currency', function() {
    setupComponentTest('ui-currency', {
        integration: true
    });

    let message;

    it('passes a11y test', function() {
        this.render(hbs`{{ui-currency '123.2'}}`);

        a11yAudit(this.$()).then((err) => expect(err).to.be.undefined);
    });

    it('properly renders default values', function() {
        this.render(hbs`{{ui-currency}}`);

        message = 'value is rendered correctly';
        expect(this.$('.ui-currency').text().trim(), message).to.eq('$0.00');

        message = 'label is rendered correctly';
        expect(this.$('.ui-currency').attr('aria-label'), message).to.eq('zero dollars');
    });

    it('properly renders a simple value', function() {
        this.render(hbs`{{ui-currency '10354'}}`);

        message = 'value is rendered correctly';
        expect(this.$('.ui-currency').text().trim(), message).to.eq('$10,354.00');

        message = 'label is rendered correctly';
        expect(this.$('.ui-currency').attr('aria-label'), message).to.eq('ten thousand, three hundred fifty-four dollars');
    });

    it('properly renders a simple decimal value', function() {
        this.render(hbs`{{ui-currency '35.65'}}`);

        message = 'value is rendered correctly';
        expect(this.$('.ui-currency').text().trim(), message).to.eq('$35.65');

        message = 'label is rendered correctly';
        expect(this.$('.ui-currency').attr('aria-label'), message).to.eq('thirty-five dollars and sixty-five cents');
    });

    it('properly renders a value of cents', function() {
        this.render(hbs`{{ui-currency '0.65'}}`);

        message = 'value is rendered correctly';
        expect(this.$('.ui-currency').text().trim(), message).to.eq('$0.65');

        message = 'label is rendered correctly';
        expect(this.$('.ui-currency').attr('aria-label'), message).to.eq('zero dollars and sixty-five cents');
    });
});
