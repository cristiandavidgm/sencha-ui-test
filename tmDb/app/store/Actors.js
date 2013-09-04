Ext.define('tmDb.store.Actors', {

    extend: 'Ext.data.Store',

    config: {

        //Do not load the store on app launch
        autoLoad: false,
        
        //The model used in this store
        model: 'tmDb.model.Actor',

        //An id to identify it on the app.
        storeId: 'myActorsStore',

        //group the store using the lastName field
        groupField: 'lastName',

        //This is the adpator to the API 
        proxy: 
        {

            //type: 'jsonp',  //set this when using the api directly 
            type: 'rest',

            //Set the api key 
            extraParams : [{

                //api_key: tmDb.util.Globals.apiKey  //set this when using the api directly 

            }],

            //the URL to the resource
            url: tmDb.util.Globals.BaseApiURL + 'search/person',

            //The reader of the response given by the api. We specify json so it parses json and associate it to the model.
            reader: {

                type: 'json',

                //The root property of the json object where the results are.
                rootProperty: 'results'
            }
        },
        
        
        //sort the store by name on load
        sorters: [
                {
                property : "name",
                direction: "ASC"
            }
        ]
        

    }
});