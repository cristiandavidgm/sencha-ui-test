Ext.define('tmDb.controller.ActorsListPanel', {

    extend: 'Ext.app.Controller',
    
    config: {
        refs: {

            ActorsListPanel: 'ActorsListPanel',
            SearchField: 'ActorsListPanel list toolbar searchfield',
            ActorsList: 'ActorsListPanel list'
        },

        control: {
            SearchField: {

                clearicontap: 'onSearchClearIconTap,',
                change: 'onSearchChange'

            },
            ActorsList: {
                'itemtap' : 'onActorsListItemTap'
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {

        Ext.data.JsonP.request({
            url: tmDb.util.Globals.BaseApiURL+'configuration',
            callbackKey: 'callback',
            params: {

                api_key: tmDb.util.Globals.apiKey,
                format: 'json'
            },
            success: function(result, request) {
                
                tmDb.util.Globals.apiConfig = result;

            }
        });
        
    },

    onActorsListItemTap: function ( theList, index, target, record, event, eOpts ){

        console.log('onActorsListItemTap');

        console.log( record );

        //get the store and the value of the field
        var  MoviesStore = Ext.data.StoreManager.lookup('myMoviesStore');

        var MoviesStoreProxy  =  MoviesStore.getProxy( );

        MoviesStoreProxy.setExtraParam( 'api_key', tmDb.util.Globals.apiKey );

        MoviesStoreProxy.setUrl( tmDb.util.Globals.BaseApiURL + 'person/'+record.get('id')+'/credits' );

        MoviesStore.load();

    },

    onSearchChange: function(field) {

        console.log('onSearchKeyUp');

        //get the store and the value of the field
        var value = field.getValue(), actorsStore = Ext.data.StoreManager.lookup('myActorsStore');

        var actorsStoreProxy  =  actorsStore.getProxy( );

        actorsStoreProxy.setExtraParam( 'query', value );
        actorsStoreProxy.setExtraParam( 'api_key', tmDb.util.Globals.apiKey );

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