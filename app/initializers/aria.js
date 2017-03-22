import Ember from 'ember';

export function initializeAria() {
    Ember.TextSupport.reopen({
        attributeBindings: [
            'ariaDescribedBy:aria-describedby'
        ]
    });
}

export default {
    name: 'aria',
    initialize: initializeAria
};
