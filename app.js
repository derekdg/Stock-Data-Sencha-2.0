Ext.application({
    
    name: 'StockApp',
		phoneStartupScreen: 'touch/phoneStart.png',
		glossOnIcon: false,
		
    requires: [],
	
    controllers: ['Main'],
    views:  ['StatsTitlebar', 'StatsForm', 'StatsList'],
    stores: ['Stats'],
		models: ['Stats'],

    launch: function() {
        
	     var mainPanel = Ext.create('Ext.Container', {
	     	id: 'mainview',
				fullscreen: true,
				scrollable: 'vertical',
				layout: {
							type: 'vbox',
							align: 'stretch'
						},
				items: [
					{
						xtype: 'statstitlebar',
						title: 'Stock Lookup'
						//docked: 'top'
					},
					{ xtype: 'statsform',
						height: 100
					},
					{ 
						xtype: 'statslist'
						//flex: 2
					}
				]
		});
    	

	} //launch
	
});
