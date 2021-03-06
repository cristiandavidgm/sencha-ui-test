/**
 * Demonstrates Toolbar Inputs.
 *
 */
Ext.define('Kitchensink.view.ToolbarInput', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.field.Search'
    ],

    config: {
        styleHtmlContent: true,
        html: 'This is a simple example of fields within toolbars.',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype      : 'searchfield',
                        placeHolder: 'Search',
                        name       : 'searchfield'
                    }
                ]
            },
            {
                docked: 'top',
                ui: 'light',
                xtype: 'toolbar',
                items: [
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Text',
                        name       : 'searchfield'
                    }
                ]
            },
            {
                docked: 'bottom',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'selectfield',
                        name : 'options',
                        options: [
                            {text: 'This is just a big select with a super long option',  value: '1'},
                            {text: 'Another select item', value: '2'}
                        ]
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});
