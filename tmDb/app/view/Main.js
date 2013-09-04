Ext.define('tmDb.view.Main', {

    //A full screen container
    extend: 'Ext.Panel',
    
    //An id to be called from the app.js file
    xtype: 'main',

    config: {

        //Split the screen in two panels horizontally
        layout: 'hbox',

        items: [
            {
                xtype: 'panel',
                layout: 'fit',
                items : [
                    {
                        //Put the actors list on the left
                        xtype: 'ActorsListPanel',
                        title: '1',
                        //Add a custom css class
                        cls: 'ActorsListPanel'
                    }
                ],
                //The size is 1/3 of the screen width
                flex: 1
                
            },
            {
                xtype: 'panel',
                layout: 'fit',
                items : [
                    {
                        //Put the mivies list on the right
                        xtype: 'MoviesListPanel',
                        title: '1'
                    }
                ],
                //The size is 2/3 of the screen width
                flex: 2
                
            },
            {
                //an informative bar on the top of the screen
                docked: 'top',
                xtype: 'titlebar',
                title: 'UI Developer Test by (CDGM)'
            }

        ]
    }
});
