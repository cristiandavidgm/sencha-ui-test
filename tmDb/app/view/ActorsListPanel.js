Ext.define('tmDb.view.ActorsListPanel', {

    //single container
    extend: 'Ext.Panel',

    //An id to be called from the main file
    xtype: 'ActorsListPanel',

    config: {


        //give it a fit layout so the list item stretches to the size of this panel
        layout: 'fit',

        items: [
            
            {
                //give it an xtype of list
                xtype: 'list',

                //itemTpl defines the template for each item in the list
                itemTpl: '<div class="contact">{name}</div>',

                //give it a link to the store instance
                store: 'myActorsStore',

                //This use a simplified html markup
                useSimpleItems: true,

                //the text to be showm when the list is empty
                emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Names for your search</div>',
                
                //add the search field to this panel
                items: [
                    {
                        xtype: 'toolbar',

                        //put the toolbar on the top
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
