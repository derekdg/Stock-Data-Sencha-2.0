Ext.define('StockApp.controller.Main', {
    
	extend: 'Ext.app.Controller',
	requires: ['Ext.data.JsonP'],
	
    config: {
        refs: {
        	main: '#mainview',
					statsForm: 'statsform',
					statsList: 'statslist',
					statsStore: 'statsstore'
        },
        control: {
			'statsform #submitbutton': {
                tap: 'onSubmitTap'
            }
        }
    },
	
	  onSubmitTap: function() {
		
		this.getMain().setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		// get the value from the form:
		var ticker = this.getStatsForm().getValues().ticker
		
		//call to YQL:
		this.makeYqlRequest(ticker, this);
		
    },
	
	makeYqlRequest: function(ticker, e) {
	
		var options = {};

		var queryString = "select * from yahoo.finance.quotes where symbol in ('" + ticker + "')";
		console.log(queryString);

		//make the YQL request
		Ext.YQL.request({
		
			//query: options.query,
			query: queryString,

			//and give it a callback when the response comes back
			callback: function(success, response) {
				var results = [];
					
				if (response.query && response.query.results) {
				
				  var o = response.query.results.quote;

				  var d = [
					{ id: 1, groupDescr: "Stock Data", itemDescr : o.Name + " (" + o.Symbol + ")", itemValue: "" },
					{ id: 2, groupDescr: "Stock Data", itemDescr: "Market Cap",     		itemValue: "$" + valueOrDefault(o.MarketCapitalization,0) },
					{ id: 3, groupDescr: "Stock Data", itemDescr: "Ask Price",     		itemValue: "$" + valueOrDefault(o.AskRealtime,0) },
					{ id: 4, groupDescr: "Stock Data", itemDescr: "52 Week High",     		itemValue: "$" + valueOrDefault(o.YearHigh,0) },
					{ id: 5, groupDescr: "Stock Data", itemDescr: "52 Week Low",     		itemValue: "$" + valueOrDefault(o.YearLow,0) },
					{ id: 6, groupDescr: "Stock Data", itemDescr: "Book Value",     		itemValue: "$" + valueOrDefault(o.BookValue,0) },
					{ id: 7, groupDescr: "Stock Data", itemDescr: "50 Day Moving Avg",     		itemValue: "$" + valueOrDefault(o.FiftydayMovingAverage,0) },
					{ id: 8, groupDescr: "Stock Data", itemDescr: "200 Day Moving Avg",     		itemValue: "$" + valueOrDefault(o.TwoHundreddayMovingAverage,0) },
					{ id: 9, groupDescr: "Dividend Data", itemDescr: "Dividend Yield",     	itemValue: valueOrDefault(o.DividendYield, 0) + "%" },
					{ id: 10, groupDescr: "Dividend Data", itemDescr: "Dividend per Share ",	itemValue: "$" + valueOrDefault(o.DividendShare) },
					{ id: 11, groupDescr: "Dividend Data", itemDescr: "Ex-Dividend Date",    itemValue: valueOrDefault(o.ExDividendDate) 	},
					{ id: 12, groupDescr: "Dividend Data", itemDescr: "Dividend Pay Date",   itemValue: valueOrDefault(o.DividendPayDate) 	},
					{ id: 13, groupDescr: "Ratios", itemDescr: "EPS",    				itemValue: valueOrDefault(o.EarningsShare)  	},
					{ id: 14, groupDescr: "Ratios", itemDescr: "EBITDA",    			itemValue: valueOrDefault(o.EBITDA) 	},
					{ id: 15, groupDescr: "Ratios", itemDescr: "Price/Sales",    		itemValue: valueOrDefault(o.PriceSales) 	},
					{ id: 16, groupDescr: "Ratios", itemDescr: "Price/Book ",    		itemValue: valueOrDefault(o.PriceBook) 	},
					{ id: 17, groupDescr: "Ratios", itemDescr: "Price/Earnings",  	itemValue: valueOrDefault(o.PERatio) 	},
					{ id: 18, groupDescr: "Ratios", itemDescr: "PEG ",    			itemValue: valueOrDefault(o.PEGRatio) 	},
					{ id: 19, groupDescr: "Ratios", itemDescr: "Short",    			itemValue: valueOrDefault(o.ShortRatio) 	}
				];
				
				//(Re)load the List:
				e.getStatsList().setData(d);
				e.getStatsList().refresh();
				
				 //Remove the Loading mask:
				e.getMain().setMasked(false);
			  }                    

			}
		});
    }

	
});

function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}

/**
 * This is a simple wrapper of the Ext.data.JsonP class to help make YQL queries easier.
 */
Ext.YQL = {
    useAllPublicTables: true,
    yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
    request: function(config) {
		
        //get the params for the request
        var params = config.params || {};
        params.q = config.query;
        params.format = 'json';

        if (this.useAllPublicTables) {
            params.env = 'store://datatables.org/alltableswithkeys';
        }

        Ext.data.JsonP.request({
            url: this.yqlUrl,
            callbackKey: 'callback',
            params: params,
            callback: config.callback,
            scope: config.scope || window
        });
    }
};