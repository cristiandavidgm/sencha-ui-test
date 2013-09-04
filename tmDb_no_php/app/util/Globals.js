Ext.define("tmDb.util.Globals",{
    
    singleton : true,

    version: '0.0.1',

    location: null,

    BaseApiURL: "http://private-7bcf-themoviedb.apiary.io/3/",

    apiKey: "81ad015af2e39bf1ebcc70e042a72515",

    apiConfig: null,

    config: {
       
    },

    constructor : function(config) {
        this.initConfig(config);
    }

});