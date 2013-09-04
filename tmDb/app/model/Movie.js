/**
 * Parse  YYYY-MM-DD on a more readable string.
 */
function release_date_formated(v, record){

    try{

        return tmDb.util.Functions.parseIsoDateAsString( record.get('release_date') );

    }catch(err){

        console.log( err.message );
        return '';

    }

}

Ext.define('tmDb.model.Movie', {

    extend: 'Ext.data.Model',
    
    config: {
        
        fields: [
        
            { name: 'id', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'character', type: 'string' },
            { name: 'original_title', type: 'string' },
            { name: 'poster_path', type: 'string' },
            { name: 'release_date', type: 'string' },
            { name: 'release_date_formated',  convert: release_date_formated}, //This is a computed property
            { name: 'adult', type: 'string' }

        ]
    }
});
