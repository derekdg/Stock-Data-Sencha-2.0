Ext.define('StockApp.view.StatsTitlebar', {
	extend: 'Ext.TitleBar',
	xtype: 'statstitlebar',
	title: 'Stock Stats',
	config: {
		items: [
			{
				id: 'aboutButton',
				text: 'About',
				ui: 'action',
				align: 'right',
				handler: function () {

					// Basic alert:
					Ext.Msg.show({
						title: 'About Site',
						cls: 'home',
						message: '<p>This mobile site is a proof-of-concept, playground, etc. for accessing Stock data.</p><p>It was built using the <a href="http://www.sencha.com/" target="foo">Sencha Touch (2.0)</a> framwork and utilizes <a href="http://developer.yahoo.com/yql/" target="foo">Yahoo! Query Language (YQL)</a> to get the last trade information</p> ',
						buttons: Ext.MessageBox.OK,
						fn: Ext.emptyFn,
						midWidth: 300
					});

				}
			}
		]
	}
});