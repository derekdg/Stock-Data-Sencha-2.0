Ext.define('StockApp.store.Stats', {
    extend: 'Ext.data.Store',
	xtype: 'statsstore',
    
    config: {
        model: 'StockApp.model.Stats',
		sorters: [
			{
				property : 'id',
				direction: 'ASC'
			}
		],
		grouper: {
		   groupFn: function(record) {
			   return record.get('groupDescr');
		   }
		},
        /*data: [
            { itemDescr: "Yield", itemValue: "3%" },
            { itemDescr: "Pay Date", itemValue: "3/1/2012" }           
        ]*/
    }
});