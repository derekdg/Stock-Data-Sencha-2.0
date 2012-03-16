Ext.define('StockApp.view.StatsList', {
    extend: 'Ext.List',
    xtype: 'statslist',
    requires: ['StockApp.store.Stats'],

    config: {
		
	    margin: 20,
	    scrollable: false,
		itemTpl: '<div class="statsList">{itemDescr} <span class="ui-li-count">{itemValue}</span></div>',
		store: 'Stats',
		grouped: true
    }
});
