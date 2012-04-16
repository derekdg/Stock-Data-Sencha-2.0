Ext.define('StockApp.view.StatsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'statsform',
	requires: ['Ext.form.FieldSet'],

		
    config: 
		{
    	margin: 20,
    	scrollable: false,
			items: [
		        {
		            xtype: 'fieldset',
		            items: [
		            	{
		                    xtype: 'textfield',
		                    name : 'ticker',
		                    label: 'Ticker:',
		                    id: 'tickerfield',
		                    autoComplete: false
		                    }
		                 
		            ]
		               
				},
				{
		            xtype:  'button',
					id:		'submitbutton',
		            text:   'Submit',
		            ui:     'confirm'
				}		
			]
		}				    

});