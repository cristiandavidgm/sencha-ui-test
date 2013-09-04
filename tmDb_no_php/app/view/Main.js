Ext.define('tmDb.view.Main', {

    extend: 'Ext.Panel',
    
    xtype: 'main',

    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {

        layout: 'hbox',

        items: [
            {
                xtype: 'panel',
                layout: 'fit',
                items : [
                    {
                        xtype: 'ActorsListPanel',
                        title: '1',
                        cls: 'ActorsListPanel'
                    }
                ],
                flex: 1
                
            },
            {
                xtype: 'panel',
                layout: 'fit',
                items : [
                    {
                        xtype: 'MoviesListPanel',
                        title: '1'
                    }
                ],
                flex: 2
                
            },
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'UI Developer Test'
            }

        ]
    }
});
