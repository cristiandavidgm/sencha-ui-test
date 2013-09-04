Ext.define("tmDb.util.Functions",{

    singleton : true,

    version: '1.0',


    config: {
    	
        property: "value"

    },

    constructor : function(config) {
        this.initConfig(config);
    },

    ucwords : function(str) {
        
        return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
            
            return $1.toUpperCase();
            
        });


    },

    lowerFirstLetter : function( string ) {
        
            return string.charAt(0).toLowerCase() + string.slice(1);

    },


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