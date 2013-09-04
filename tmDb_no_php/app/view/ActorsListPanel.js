Ext.define('tmDb.view.ActorsListPanel', {

    extend: 'Ext.Panel',

    xtype: 'ActorsListPanel',

    config: {

        tabBarPosition: 'bottom',

        //give it a fit layout so the list item stretches to the size of this panel
        layout: 'fit',

        items: [
            
            {
                //give it an xtype of list
                xtype: 'list',

                ui: 'round',

                pinHeaders: false,

                //itemTpl defines the template for each item in the list
                itemTpl: '<div class="contact">{name}</div>',

                //give it a link to the store instance
                store: 'myActorsStore',

                useSimpleItems: true,

                grouped: true,
                
                emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Names for your search</div>',
                disableSelection: true,

                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',

                        items: [
                            { xtype: 'spacer' },
                            {

                                xtype: 'searchfield',
                                placeHolder: 'Search...'
                                
                            },
                            { xtype: 'spacer' }
                        ]
                    }
                ]
            }
        ]
    }
    
});
