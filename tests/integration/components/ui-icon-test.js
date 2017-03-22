import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ui icon', function() {
    setupComponentTest('ui-icon', {
        integration: true
    });

    let message;

    it('passes a11y test', function() {
        this.render(hbs`{{ui-icon 'icon' label='label'}}`);

        a11yAudit(this.$()).then((err) => expect(err).to.be.undefined);
    });

    it('renders with the default prefix class', function() {
        this.render(hbs`{{ui-icon}}`);

        message = 'has default prefix class';
        expect(this.$('.fa'), message).to.have.lengthOf(1);

        message = 'has default aria-hidden attribute';
        expect(this.$('.fa').attr('aria-hidden'), message).to.eq('true');
    });

    it('properly renders aria-hidden and aria-label attributes', function() {
        this.set('label', null);
        this.render(hbs`{{ui-icon label=label}}`);

        message = 'sets aria-hidden attribute when a label is not present';
        expect(this.$('.fa').attr('aria-hidden'), message).to.eq('true');

        message = 'does not set aria-label attribte when a label is not present';
        expect(this.$('.fa').attr('aria-label'), message).to.undefined;

        this.set('label', 'Test');

        message = 'does not set aria-hidden when a label is present';
        expect(this.$('.fa').attr('aria-hidden'), message).to.be.undefined;

        message = 'sets aria-label attribte when a label is present';
        expect(this.$('.fa').attr('aria-label'), message).to.eq('Test');
    });

    it('renders when the icon is in a positional parameter', function() {
        this.set('icon', null);
        this.render(hbs`{{ui-icon icon}}`);

        message = 'does not add fa class when icon is not present';
        expect(this.$('.fa-test'), message).to.have.lengthOf(0);

        this.set('icon', 'time');

        message = 'adds full icon class when icon is present';
        expect(this.$('.fa-time'), message).to.have.lengthOf(1);

        this.set('icon', 'fa-trash');
        message = 'properly checks for presence of prefix in icon name';
        expect(this.$('.fa-trash'), message).to.have.lengthOf(1);
    });

    it('renders when the icon is in a attribute', function() {
        this.set('icon', null);
        this.render(hbs`{{ui-icon icon=icon}}`);

        message = 'does not add fa class when icon is not present';
        expect(this.$('.fa-test'), message).to.have.lengthOf(0);

        this.set('icon', 'time');

        message = 'adds full icon class when icon is present';
        expect(this.$('.fa-time'), message).to.have.lengthOf(1);

        this.set('icon', 'fa-trash');
        message = 'properly checks for presence of prefix in icon name';
        expect(this.$('.fa-trash'), message).to.have.lengthOf(1);
    });
});
