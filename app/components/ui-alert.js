import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const {
    Component
} = Ember;

export default Component.extend({
    classNames: ['alert-container'],
    attributeBindings: [
        'role',
        'live:aria-live',
        'atomic:aria-atomic'
    ],
    layout: hbs`
        {{#if message}}
            <div class="alert alert-{{type}}">
                {{#if title}}
                    <strong class={{unless titleVisible 'sr-only'}}>{{title}}:</strong>
                {{/if}}
                {{message}}
            </div>
        {{/if}}
    `,

    type: 'info',
    title: null,
    titleVisible: false,
    message: null,
    role: 'alert',
    live: 'polite',
    atomic: 'true'
});
