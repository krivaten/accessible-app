import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const {
    Component,
    computed,
    assert,
    isPresent,
    get,
    guidFor

} = Ember;

const LABEL_MSG = 'You must provide a "label" attribute for all uses of "{{ui-input}}" for impaired users. If you want to hide the label visually, you may also provide the attribute labelHidden=true.';

export default Component.extend({
    classNames: ['form-group'],
    layout: hbs`
        <label for="{{inputId}}" class="{{if labelHidden 'sr-only'}}">
            {{label}}
            {{#if required}}
                <sup class="text-danger">*</sup>
            {{/if}}
        </label>
        {{#if hasBlock}}
            {{yield this}}
        {{else}}
            {{input
                id=inputId
                ariaDescribedBy=(if description descriptionId)
                type=type
                value=value
                placeholder=placeholder
                disabled=disabled
                required=required
                class="form-control"}}
        {{/if}}
        {{#if description}}
            <p id="{{descriptionId}}" class="{{if descriptionHidden 'sr-only'}}">
                {{description}}
            </p>
        {{/if}}
    `,

    id: null,
    type: 'text',
    value: null,
    placeholder: null,
    disabled: null,
    required: null,
    labelHidden: null,

    label: computed({
        set(key, value) {
            assert(LABEL_MSG, isPresent(value));
            return value;
        }
    }),

    containerId: computed('id', function() {
        return get(this, 'id') || guidFor(this);
    }),

    inputId: computed('id', function() {
        return `${get(this, 'containerId')}-input`;
    }),

    descriptionId: computed('containerId', function() {
        return `${get(this, 'containerId')}-description`;
    })
});
