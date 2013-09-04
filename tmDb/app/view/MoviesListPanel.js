Ext.define('tmDb.view.MoviesListPanel', {

    //single container
    extend: 'Ext.Panel',

    //An id to be called from the main file
    xtype: 'MoviesListPanel',

    config: {

        //give it a fit layout so the list item stretches to the size of this panel
        layout: 'fit',

        items: [
            
            {
                //give it an xtype of list
                xtype: 'list',

                ui: 'round',

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

                //This use a simplified html markup
                useSimpleItems: true,

                //the text to be showm when the list is empty
                emptyText: '<div style="margin-top: 20px; text-align: center">No movies where found for this actor.</div>',
                disableSelection: true

            }
        ]
    }
    
});
