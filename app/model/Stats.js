Ext.define('StockApp.model.Stats', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
				{ name: 'id', type: 'int'},
				{ name: 'groupDescr', type: 'string'},
				{ name: 'itemDescr', type: 'string' },
				{ name: 'itemValue', type: 'string' }
			]
    }
});