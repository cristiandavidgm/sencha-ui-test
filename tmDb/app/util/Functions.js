Ext.define("tmDb.util.Functions",{

    singleton : true,

    version: '1.0',


    config: {
    	
        property: "value"

    },

    constructor : function(config) {
        this.initConfig(config);
    },

    /**
     * Parse  YYYY-MM-DD on a more readable string.
     */
    parseIsoDateAsString: function( isoDate ){

        if ( Ext.isEmpty( isoDate ) )
        {
            return 'N/A';
        }else
        {
            var date = new Date(isoDate);
            return (Ext.Date.format(date, 'M j \\of Y'));
        }
        

    }

});