import Ember from 'ember';

const {
    Component,
    get,
    computed,
} = Ember;

const UiIcon = Component.extend({
    tagName: 'span',
    classNameBindings: [
        'prefix',
        'iconClass'
    ],
    attributeBindings: [
        'label:aria-label',
        '_ariaHidden:aria-hidden'
    ],

    label: null,
    prefix: 'fa',
    icon: null,

    _ariaHidden: computed('label', function() {
        return get(this, 'label') ? undefined : 'true';
    }),

    iconClass: computed('icon', function() {
        const prefix = get(this, 'prefix');
        const icon = get(this, 'icon');

        if (!icon) {
            return;
        }

        return (icon.indexOf(`${prefix}-`) > -1) ? icon : `${prefix}-${icon}`;
    })
});

UiIcon.reopenClass({
    positionalParams: ['icon']
});

export default UiIcon;
