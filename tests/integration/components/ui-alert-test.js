import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ui alert', function() {
    let message;
    setupComponentTest('ui-alert', {
        integration: true
    });

    it('passes a11y test', function() {
        this.render(hbs`{{ui-alert message='Test'}}`);

        a11yAudit(this.$()).then((err) => expect(err).to.be.undefined);
    });

    it('renders', function() {
        this.render(hbs`{{ui-alert}}`);

        message = 'role is "alert" by default';
        expect(this.$('.alert-container').attr('role'), message).to.eq('alert');

        message = 'aria-live is "polite" by default';
        expect(this.$('.alert-container').attr('aria-live'), message).to.eq('polite');

        message = 'aria-atomic is "true" by default';
        expect(this.$('.alert-container').attr('aria-atomic'), message).to.eq('true');
    });

    it('renders a custom role value', function() {
        this.render(hbs`{{ui-alert role='banner'}}`);
        expect(this.$('.alert-container').attr('role')).to.eq('banner');
    });

    it('renders a custom aria-live value', function() {
        this.render(hbs`{{ui-alert live='assertive'}}`);
        expect(this.$('.alert-container').attr('aria-live')).to.eq('assertive');
    });

    it('renders a custom aria-atomic value', function() {
        this.render(hbs`{{ui-alert atomic='false'}}`);
        expect(this.$('.alert-container').attr('aria-atomic')).to.eq('false');
    });

    it('renders custom alert type', function() {
        this.set('message', 'Alert message');
        this.set('type', 'info');
        this.render(hbs`{{ui-alert message=message type=type}}`);
        expect(this.$('.alert').hasClass('alert-info')).to.be.true;
    });

    it('renders the message properly', function() {
        this.set('message', null);
        this.render(hbs`{{ui-alert message=message}}`);

        message = 'message is not rendered when it is not set';
        expect(this.$('.alert'), message).to.have.lengthOf(0);

        this.set('message', 'Alert message');

        message = 'message is rendered when it is set';
        expect(this.$('.alert'), message).to.have.lengthOf(1);
    });

    it('renders the title correctly', function() {
        this.set('message', 'Alert message');
        this.set('titleVisible', false);
        this.render(hbs`{{ui-alert message=message title=title titleVisible=titleVisible}}`);

        message = 'title is not rendered when it is not set';
        expect(this.$('strong'), message).to.have.lengthOf(0);

        this.set('title', 'Danger');

        message = 'title is rendered when it is set';
        expect(this.$('strong'), message).to.have.lengthOf(1);

        message = 'title is the correct value';
        expect(this.$('strong').text().trim(), message).to.eq('Danger:');

        message = 'screen reader only class is added when titleVisible is false';
        expect(this.$('strong').hasClass('sr-only'), message).to.be.true;

        this.set('titleVisible', true);

        message = 'screen reader only class is not added when titleVisible is true';
        expect(this.$('strong').hasClass('sr-only'), message).to.be.false;
    });
});
