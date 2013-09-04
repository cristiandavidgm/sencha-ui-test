Ext.define('tmDb.store.Actors', {

    extend: 'Ext.data.Store',

    config: {

        autoLoad: false,
        
        model: 'tmDb.model.Actor',

        storeId: 'myActorsStore',

        //group the store using the lastName field
        groupField: 'lastName',

        
        proxy: 
        {

            type: 'jsonp',

            extraParams : [{

                api_key: tmDb.util.Globals.apiKey

            }],

            url: tmDb.util.Globals.BaseApiURL + 'search/person',

            reader: {

                type: 'json',

                rootProperty: 'results'
            }
        },
        
        
        
        sorters: [
                {
                property : "name",
                direction: "ASC"
            }
        ]
        

    }
});