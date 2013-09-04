//We just need one controller since the movies list do not have any aditional functionality.
Ext.define('tmDb.controller.ActorsListPanel', {

    extend: 'Ext.app.Controller',
    
    config: {
        //Make references to the visual controls
        refs: {
            //The actors list panel containig the list
            ActorsListPanel: 'ActorsListPanel',
            //the search field
            SearchField: 'ActorsListPanel list toolbar searchfield',
            //The actors list.
            ActorsList: 'ActorsListPanel list'
        },

        //Define actions to take on controls events.
        control: {

            //Events over the search field
            SearchField: {

                //When the search field is cleared
                clearicontap: 'onSearchClearIconTap,',
                //When the searched text is changed.
                change: 'onSearchChange'

            },
            //Events over the actors list
            ActorsList: {
                //Some actor list item was taped.
                'itemtap' : 'onActorsListItemTap'
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {

        //We load the API configuration on load. so if we need to show images we get the root URL.
        Ext.Ajax.request({

            url: tmDb.util.Globals.BaseApiURL+'configuration',
            method : 'GET',
            params: {
                //api_key: tmDb.util.Globals.apiKey, //use this line when connecting directly to the api.
                format: 'json'
            },
            success: function(response){

                //Save the configuration to the app config.
                tmDb.util.Globals.apiConfig = response;

            }
        });
                
    },

    /*Some actor list item was taped.
     *
     * theList : the complete actors list object
     * index   : the index of the taped record inside the list.
     * target  : The object representing the list item
     * record  : the data from the actor who was taped
    */
    onActorsListItemTap: function ( theList, index, target, record){

        //I like to know what was executed
        console.log('onActorsListItemTap');

        //get the store and the value of the field
        var  MoviesStore = Ext.data.StoreManager.lookup('myMoviesStore');

        //get the proxy
        var MoviesStoreProxy  =  MoviesStore.getProxy( );

        //MoviesStoreProxy.setExtraParam( 'api_key', tmDb.util.Globals.apiKey ); //set this if using the api directly

        //set the url to the resource
        MoviesStoreProxy.setUrl( tmDb.util.Globals.BaseApiURL + 'person/'+record.get('id')+'/credits' );

        //load the store, this goes and load the store from the rest api. Pretty easy actually.
        MoviesStore.load();

    },

    /*The text on the search field has changed.
     *
     * field : the new text
    */
    onSearchChange: function(field) {

        //I like to know what was executed
        console.log('onSearchChange');

        //get the store and the value of the field
        var value = field.getValue(), actorsStore = Ext.data.StoreManager.lookup('myActorsStore');

        //get the proxy
        var actorsStoreProxy  =  actorsStore.getProxy( );

        //set the url to the resource
        actorsStoreProxy.setExtraParam( 'query', value );

        //actorsStoreProxy.setExtraParam( 'api_key', tmDb.util.Globals.apiKey ); //set this if using the api directly

        //load the store, this goes and load the store from the rest api. Pretty easy actually.
        actorsStore.load();

    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {

        console.log('onSearchClearIconTap');

        //call the clearFilter method on the store instance
        //Ext.data.StoreManager.lookup('myActorsStore').clearFilter();
    }

});