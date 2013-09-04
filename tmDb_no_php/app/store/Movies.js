Ext.define('tmDb.store.Movies', {

    extend: 'Ext.data.Store',

    config: {

        autoLoad: false,
        
        model: 'tmDb.model.Movie',

        storeId: 'myMoviesStore',

        //group the store using the lastName field
        groupField: 'release_date',

        
        proxy: 
        {

            type: 'jsonp',

            extraParams : [{

                api_key: tmDb.util.Globals.apiKey
                
            }],

            url: tmDb.util.Globals.BaseApiURL + 'person/{id}/credits', // this must be changed on every request. It is here to make it clear

            reader: {

                type: 'json',

                rootProperty: 'cast'
            }
        },
        
        
        
        sorters: [
                {
                property : "release_date",
                direction: "ASC"
            }
        ]
        

    }
});