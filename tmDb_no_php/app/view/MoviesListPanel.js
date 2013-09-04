Ext.define('tmDb.view.MoviesListPanel', {

    extend: 'Ext.Panel',

    xtype: 'MoviesListPanel',

    config: {

        tabBarPosition: 'bottom',

        //give it a fit layout so the list item stretches to the size of this panel
        layout: 'fit',

        items: [
            
            {
                //give it an xtype of list
                xtype: 'list',

                ui: 'round',

                pinHeaders: false,

                //itemTpl defines the template for each item in the list
                itemTpl: [
                    //'<div class="contact">{release_date}</div> - <div class="contact">{title}</div>',
                    '<div class="flexbox" style="display: -webkit-box; -webkit-box-orient: horizontal;overflow: hidden;">',
                        
                        '<div class="cell1" style="-webkit-box-flex: 1;overflow: hidden;-webkit-box-sizing: border-box;width: 1px;" > <tpl if="!Ext.isEmpty(release_date_formated)"> {release_date_formated}  <tpl else> N/A </tpl>  </div>',
                        '<div class="cell2" style="-webkit-box-flex: 3;overflow: hidden;width: 1px;" > {title} </div>',

                    '</div>'
                ].join(''),


                //give it a link to the store instance
                store: 'myMoviesStore',

                useSimpleItems: true,

                //grouped: true,
                
                emptyText: '<div style="margin-top: 20px; text-align: center">No movies where found for this actor.</div>',
                disableSelection: true

            }
        ]
    }
    
});
