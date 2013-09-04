Ext.define('tmDb.store.Movies', {

    extend: 'Ext.data.Store',

    config: {

        //Do not load the store on app launch
        autoLoad: false,
        
        //The model used in this store
        model: 'tmDb.model.Movie',

        //An id to identify it on the app.
        storeId: 'myMoviesStore',

        //group the store using the release_date field
        groupField: 'release_date',

        //This is the adpator to the API 
        proxy: 
        {

            //type: 'jsonp', //set this when using the api directly 
            type: 'rest',


            extraParams : [{

                //api_key: tmDb.util.Globals.apiKey   //set this when using the api directly 
                
            }],

            //the URL to the resource
            url: tmDb.util.Globals.BaseApiURL + 'person/{id}/credits', // this must be changed on every request. It is here to make it clear

             //The reader of the response given by the api. We specify json so it parses json and associate it to the model.
            reader: {

                type: 'json',

                //The root property of the json object where the results are.
                rootProperty: 'cast'
            }
        },
        
        
        //sort the store by release_date on load
        sorters: [
                {
                property : "release_date",
                direction: "ASC"
            }
        ]
        

    }
});