Ext.define('tmDb.model.Actor', {

    extend: 'Ext.data.Model',
    
    config: {

        fields: [
        
            { name: 'adult', type: 'boolean' },
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'profile_path', type: 'string' }

        ]
    }
});
