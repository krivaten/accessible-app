import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import { initializeAria } from 'accessible-app/initializers/aria';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import hbs from 'htmlbars-inline-precompile';

describe('KVH Integration | Component | ui input', function() {
    let message;

    setupComponentTest('ui-input', {
        integration: true
    });

    beforeEach(function() {
        this.set('label', 'label');
        initializeAria();
    });

    it('passes a11y test', function() {
        this.render(hbs`{{ui-input label=label description='demo'}}`);

        a11yAudit(this.$()).then((err) => expect(err).to.be.undefined);
    });

    it('renders with unique id', function() {
        this.render(hbs`{{ui-input label=label description='demo'}}`);

        message = 'input has unique id';
        let inputId = this.$('input').attr('id');
        expect(inputId, message).to.match(/^ember(\d+)-input/);

        message = 'label references unique input id';
        expect(this.$('label').attr('for'), message).to.eq(inputId);

        message = 'description has unique id';
        let descriptionId = this.$('p').attr('id');
        expect(descriptionId, message).to.match(/^ember(\d+)-description/);

        message = 'input references unique description id';
        expect(this.$('input').attr('aria-describedby'), message).to.eq(descriptionId);
    });

    it('renders with custom id', function() {
        this.render(hbs`{{ui-input id='demo' label=label description='demo'}}`);

        message = 'input has custom id';
        let inputId = this.$('input').attr('id');
        expect(inputId, message).to.eq('demo-input');

        message = 'label references custom input id';
        expect(this.$('label').attr('for'), message).to.eq(inputId);

        message = 'description has custom id';
        let descriptionId = this.$('p').attr('id');
        expect(descriptionId, message).to.eq('demo-description');

        message = 'input references custom description id';
        expect(this.$('input').attr('aria-describedby'), message).to.eq(descriptionId);
    });

    it('toggles visibility of label', function() {
        this.set('labelHidden', false);
        this.render(hbs`{{ui-input label=label labelHidden=labelHidden}}`);

        message = 'label is not hidden by default';
        expect(this.$('label').hasClass('sr-only'), message).to.be.false;

        this.set('labelHidden', true);

        message = 'label is hidden when labelHidden is "true"';
        expect(this.$('label').hasClass('sr-only'), message).to.be.true;
    });

    it('renders description', function() {
        this.set('description', null);
        this.render(hbs`{{ui-input label=label description=description}}`);

        message = 'description is not present by default';
        expect(this.$('p'), message).to.have.lengthOf(0);

        this.set('description', 'demo');

        message = 'description is rendered when it has a value';
        expect(this.$('p'), message).to.have.lengthOf(1);

        message = 'description is the correct value';
        expect(this.$('p').text().trim(), message).to.eq('demo');
    });

    it('toggles visibility of description', function() {
        this.set('descriptionHidden', false);
        this.render(hbs`{{ui-input label=label description='demo' descriptionHidden=descriptionHidden}}`);

        message = 'description is not hidden by default';
        expect(this.$('p').hasClass('sr-only'), message).to.be.false;

        this.set('descriptionHidden', true);

        message = 'description is hidden when descriptionHidden is "true"';
        expect(this.$('p').hasClass('sr-only'), message).to.be.true;
    });

    it('errors out when label is null', function(done) {
        this.render(hbs`{{ui-input label=label}}`);

        try {
            this.set('label', null);
        } catch (error) {
            expect(error.name, message).to.eq('Error');
            done();
        }
    });

    it('renders a passed in block', function() {
        this.render(hbs`{{#ui-input label=label}}demo{{/ui-input}}`);

        message = 'renders block content';
        expect(this.$().text().trim(), message).to.contain('demo');
    });
});
